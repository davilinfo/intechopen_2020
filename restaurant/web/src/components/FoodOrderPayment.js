import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import api from '../services/api';
import FormPayment from './FormPayment';
import '../styles.css';

function FoodOrderPayment(props){        
    var querystring = document.location.href.split("?")[1];         

    var [order, setOrder] = useState([]);                    
    
    /*this function should be uncommented if is desired to sign transaction at frontend*/
    async function handleSubmit(data){                                                          
               
        order = await api.post('/clientPayment', {transaction: data.txFood, networkid: 'identifier'});
        console.log(order);
        
        setOrder(order);                  
        
        if (order.data.status === "Transaction result"){

            const transaction_result = (
                <div className="recipes_topic">                    
                    {order.data.status}
                    <br />
                    Transaction id: {order.data.response.transaction.id}
                    <br/>
                    Paid Amount: LSK {order.data.response.transaction.amount/100000000}
                    <br/>
                    Payer LSK address: {order.data.response.transaction.senderId}
                    <br/>
                    Restaurant LSK address: {order.data.response.transaction.recipientId}
                    <br/>
                    Broadcast info: {order.data.response.broadcastInfo.data.message}                
                    <div className="clear"></div>
                </div>
            );
            
            ReactDOM.render(transaction_result, document.getElementById('content'));        
        }else{
            const transaction_result = (
                <div className="recipes_topic">                    
                    Transaction result: {order.data.status}                                  
                    <div className="clear"></div>
                </div>
            );
            
            ReactDOM.render(transaction_result, document.getElementById('content'));  
        }
    }       
    
    /*
    async function handleSubmit(data){                              
        var orderstring = decodeURI(querystring);
        if (orderstring !== null && orderstring !== undefined){    
            orderstring = orderstring.split("&");
                            
            data.recipientAddress = orderstring[0].split('=')[1];
            data.amount = orderstring[1].split('=')[1];
            data.name = orderstring[2].split('=')[1];
            data.request_type = orderstring[3].split('=')[1];
            data.timestamp = orderstring[4].split('=')[1];
            data.username = orderstring[5].split('=')[1];
            data.phone = orderstring[6].split('=')[1];
            data.deliveryaddress = orderstring[7].split('=')[1];
            data.table = 1;
            data.user = 1;            
        }                        

        order = await api.post('/userRequest', data);
        setOrder(order);                  

        const transaction_result = (
            <div className="recipes_topic">                    
                {order.data.status}
                <br />
                Transaction id: {order.data.response.transaction.id}
                <br/>
                Paid Amount: LSK {order.data.response.transaction.amount/100000000}
                <br/>
                Payer LSK address: {order.data.response.transaction.senderId}
                <br/>
                Restaurant LSK address: {order.data.response.transaction.recipientId}
                <br/>
                Broadcast info: {order.data.response.broadcastInfo.data.message}                
                <div className="clear"></div>
            </div>
        );

        ReactDOM.render(transaction_result, document.getElementById('content'));        
    }*/

    return (
        <div id="app">
            <div id="content" align="center">                
                <FormPayment onSubmit={handleSubmit} orderstring={querystring}></FormPayment>
            </div>
        </div>
    );
}

export default FoodOrderPayment;