import React, { useState, useEffect } from 'react';

import '../styles.css';

function FormRefund({onSubmit}){
    const [amount, setAmount] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [password, setPassword] = useState('');
    const [transactionId, setTransaction] = useState('');

    useEffect(() => {

    });

    async function handleSubmit(e){
        e.preventDefault();

        await onSubmit({
            transactionId,
            amount,
            recipientAddress,
            password
        });

        setAmount('');
        setRecipientAddress('');
        setPassword('');
        setTransaction('');
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
                        <label>LSK Amount</label>
                    </div>
                    <div>
                        <input type="text" id="amount" name="amount" required onChange={e=> setAmount(e.target.value)}/>
                    </div>
                    <div>
                        <label>LSK Recipient address to be refunded</label>
                    </div>
                    <div>
                        <input type="text" id="recipientAddress" name="recipientAddress" required onChange={e=> setRecipientAddress(e.target.value)}/>
                    </div>
                    <div>
                        <label>Password</label>
                    </div>
                    <div>
                        <input type="password" id="password" name="password" required onChange={e=> setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <button type="submit">Refund</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormRefund;