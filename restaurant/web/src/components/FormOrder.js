import React, { useState, useEffect } from 'react';

import '../styles.css';

const cryptography = require('@liskhq/lisk-cryptography');

function FormOrder({onSubmit}){
    const [username, setUsername] = useState('');
    const [passphrase, setPassphrase] = useState('');
    const [phone, setPhone] = useState('');
    const [deliveryaddress, setDeliveryAddress] = useState('');    

    async function handleSubmit(e){
        e.preventDefault();

        const encryptedPassphrase = cryptography.encryptPassphraseWithPassword(passphrase, 'luxuryRestaurant');

        await onSubmit({
            username,
            phone,
            deliveryaddress,
            encryptedPassphrase
        });

        setUsername('');
        setPhone('');
        setDeliveryAddress('');
        setPassphrase('');        
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
                        <label>Your Lisk Passphrase</label>
                    </div>
                    <div>
                        <input type="text" id="passphrase" name="passphrase" required onChange={e=> setPassphrase(e.target.value)}/>
                    </div>
                    <div>
                        <label>copy this passphrase and test above if desired: wagon stock borrow episode laundry kitten salute link globe zero feed marble</label>
                    </div>
                    <div>
                        <button type="submit">Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormOrder;