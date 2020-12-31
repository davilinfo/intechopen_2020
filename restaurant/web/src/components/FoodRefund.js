import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import api from '../services/api';
import FormRefund from './FormRefund';
import '../styles.css';
const transactions = require("@liskhq/lisk-transactions");

function FoodRefund(props){                   
    var [order, setOrder] = useState([]);            

    async function handleSubmit(data){                

        order = await api.post('/refund', data);   
        setOrder(order);    
        
        const transaction_result = (
            <div className="recipes_topic">                    
                Transaction result: {order.data.status}
                <br />
                Refund Transaction id: {order.data.response.transaction.id}
                <br/>
                Paid Amount: LSK {transactions.utils.convertBeddowsToLSK(order.data.response.transaction.amount)}
                <br/>
                Restaurant LSK address: {order.data.response.transaction.senderId}
                <br/>
                Client LSK address: {order.data.response.transaction.recipientId}
                <br/>
                Broadcast info: {order.data.response.broadcastInfo.data.message}                
                <div className="clear"></div>
            </div>
        );

        ReactDOM.render(transaction_result, document.getElementById('content'));        
    }        

    return (
        <div id="app">
            <div id="content" align="center">                
                <FormRefund onSubmit={handleSubmit}></FormRefund>                
            </div>
        </div>
    );
}

export default FoodRefund;