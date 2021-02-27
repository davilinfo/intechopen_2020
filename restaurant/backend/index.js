const express = require('express');
const cors = require('cors');
const http = require('http');
const routes = require('./routes/routes');
const transaction_vector = require('./models/transaction_vector');

const app = express();
const server= http.Server(app);

app.use(cors());
//register json in entire application
app.use(express.json());
app.use(routes);
app.use(express.static(__dirname.concat('/foodTypes')));

server.listen(3333);

console.log("Initiated...");

var interval = setInterval(function (){
    console.log('vector length:'.concat(transaction_vector.vector.length));    
    if (transaction_vector.vector.length > 500){
        transaction_vector.vector = [];
        transaction_vector.wallet = [];
    }

}, 10000);
