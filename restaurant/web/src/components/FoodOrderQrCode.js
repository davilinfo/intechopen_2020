import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactQrCode from 'qrcode-react';
import api from '../services/api';
import FormOrderQrCode from './FormOrderQrCode';
//import FoodOrderPayment from './FoodOrderPayment';
import '../styles.css';

function FoodOrderQrCode(props){        
    var foodType = document.location.pathname.split("/")[2];    

    var [food, setFood] = useState([]);
    var [order, setOrder] = useState([]);
    var [orderstring, setOrderString] = useState('');    

    useEffect (() => {
      async function loadFood(){
        console.log("loading food");                    
        const response = await api.get('/foodDetail/'.concat(foodType));
        food = response.data.response;
        setFood(food);        
      }
             
      loadFood();
    }, []);             

    async function handleSubmit(data){
        
        data.request_type = foodType;

        order = await api.post('/storeQrCode', data);           
        setOrder(order);             

        orderstring = encodeURI("recipient=".concat(order.data.response.split("&")[0].split("=")[1])
        .concat("&amount=").concat(order.data.response.split("&")[1].split("=")[1])
        .concat("&food=").concat(order.data.response.split("&")[2].split("=")[1])
        .concat("&foodtype=").concat(order.data.response.split("&")[3].split("=")[1])
        .concat("&timestamp=").concat(order.data.response.split("&")[4].split("=")[1])
        .concat("&username=").concat(order.data.response.split("&")[5].split("=")[1])
        .concat("&phone=").concat(order.data.response.split("&")[6].split("=")[1])
        .concat("&deliveryaddress=").concat(order.data.response.split("&")[7].split("=")[1])
        .concat("&observation=").concat(
            order.data.response.split("&")[8] !== undefined ?
            order.data.response.split("&")[8].split("=")[1]:
            ""))
        .concat("&recipientpublickey=").concat(order.data.response.split("&")[9].split("=")[1]);
        
        setOrderString(orderstring);   

        const transaction_result = (
            <div className="recipes_topic">    
                <img src={`../${food.img}`} width="200" height="200" alt="" /> 
                <br />
                <p>
                Food description: {food.description} 
                </p>
                <p>
                Amount: {food.amount}
                </p>
                <br/>
                {order.data.status}                    
                <br/>
                <label>Point the camera of your phone to the qr code. Once loaded proceed with the payment</label>                
                <br/>                
                <div id="divqrcode">
                    <div id="divqrcode">
                        <ReactQrCode value={order.data.response}/>
                    </div>              
                </div>                     
                
                <br/>
                <a href={`/FoodOrderPayment?${orderstring}`} querystring={`${orderstring}`}>Or proceed with direct payment here</a>                
                
                <div className="clear"></div>
            </div>
        );

        ReactDOM.render(transaction_result, document.getElementById('content'));
    }

    return (
        <div id="app">
            <div id="content" align="center">
                <img src={`../${food.img}`} width="200" height="200" alt="" />
                <div className="recipes_topic">                                         
                    {food.food}                    
                    <br />
                    <p style={{width: 300}}>
                    Food description: {food.description}                    
                    </p>                                
                    Amount: {food.amount}        
                    <br/>
                    <div className="clear"></div>                    
                </div>
                <br/>
                <FormOrderQrCode onSubmit={handleSubmit}></FormOrderQrCode>
                    
            </div>            
        </div>
    );
}

export default FoodOrderQrCode;