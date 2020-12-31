import React, { useState, useEffect } from 'react';
import '../styles.css';
import api from '../services/api';

const cryptography = require('@liskhq/lisk-cryptography');

function FormReservation({onSubmit}){    
    const [transactionId, setTransaction] = useState('');    
    const [passphrase, setPassphrase] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
                
        const address = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase).address;
        const publicKey = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase).publicKey;

        var foodRequest = await api.post('/transaction', {
            transactionId,            
            address
        });                          

        var clientData = "";
        var result = "";         
        
        try{
            clientData = foodRequest.data.response.data.length > 0 && foodRequest.data.response.data[0].asset.clientNonce !== undefined ? cryptography.decryptMessageWithPassphrase(foodRequest.data.response.data[0].asset.clientData, foodRequest.data.response.data[0].asset.clientNonce, passphrase, publicKey) : "";
            result = {  foodRequest: foodRequest,
                phone: clientData !== "" ? clientData.split(' ***Field*** ')[1] : foodRequest.data.response.data[0].asset.phone,
                deliveryAddress: clientData !== "" ? clientData.split(' ***Field*** ')[2] : foodRequest.data.response.data[0].asset.deliveryaddress,
                user: clientData !== "" ? clientData.split(' ***Field*** ')[0] : foodRequest.data.response.data[0].asset.username,
                observation: clientData !== "" ? clientData.split(' ***Field*** ')[3] : ""
            };
        }catch (e){
            alert("Something wrong with this search data");
            result = {  foodRequest: foodRequest,
                phone: "***",
                deliveryAddress: "***",
                user: "***",
                observation: "***"
            };
        }             

        await onSubmit({
            result
        });
        
        setTransaction('');        
        setPassphrase('');
    }

    return (
        <div id="app">
            <div id="content" align="center">                
                <form onSubmit={handleSubmit}>
                    <input type="hidden" id="request_type" name="request_type"></input>                
                    <div>
                        <label>Transaction id</label>
                    </div>
                    <div>
                        <input type="text" id="transactionId" name="transactionId" required onChange={e=> setTransaction(e.target.value)}/>
                    </div>                    
                    <div>
                        <label>Passphrase</label>
                    </div>
                    <div>
                        <input type="password" id="passphrase" name="passphrase" onChange={e=> setPassphrase(e.target.value)}/>
                    </div>               
                    <div>
                        <button type="submit">Retrieve information of transaction requested</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormReservation;