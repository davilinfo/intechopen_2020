import React, { useState } from 'react';

import '../styles.css';

function FormOrderQrCode({onSubmit}){
    const [username, setUsername] = useState('');    
    const [phone, setPhone] = useState('');
    const [deliveryaddress, setDeliveryAddress] = useState(''); 
    const [observation, setObservation] = useState('');   

    async function handleSubmit(e){
        e.preventDefault();
        
        await onSubmit({
            username,
            phone,
            deliveryaddress,
            observation
        });

        setUsername('');
        setPhone('');
        setDeliveryAddress('');   
        setObservation('');     
    }

    return (
        <div id="app">
            <div id="content" align="center">                
                <form onSubmit={handleSubmit}>
                    <input type="hidden" id="request_type" name="request_type"></input>
                    <div>
                        <label>Your Name</label>
                    </div>
                    <div>
                        <input type="text" id="username" name="username" required onChange={e=> setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label>Your phone</label>
                    </div>
                    <div>
                        <input type="text" id="phone" name="phone" required onChange={e=> setPhone(e.target.value)}/>
                    </div>
                    <div>
                        <label>Delivery address</label>
                    </div>
                    <div>
                        <textarea rows="5" id="deliveryaddress" name="deliveryaddress" required onChange={e=> setDeliveryAddress(e.target.value)}/>
                    </div>
                    <div>
                        <label>Any observation</label>
                    </div>
                    <div>
                        <textarea rows="5" id="observation" name="observation" onChange={e=> setObservation(e.target.value)}/>
                    </div>
                    <div>
                        <button type="submit">Place your order</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormOrderQrCode;