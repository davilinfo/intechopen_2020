import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import History from './components/History';
import Menu from './components/Menu';
import FoodOrderQrCode from './components/FoodOrderQrCode';
import FoodOrderPayment from './components/FoodOrderPayment';
import FoodOrder from './components/FoodOrder';
import FoodRefund from './components/FoodRefund';
import FoodReservation from './components/FoodReservation';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

const routing = (
    <Router>        
        <Header />        
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/History" component={History} />
            <Route path="/Menu" component={Menu} />
            <Route path="/FoodOrderQrCode" component={FoodOrderQrCode} />
            <Route path="/FoodOrderPayment" component={FoodOrderPayment} />
            <Route path="/FoodOrder" component={FoodOrder} />
            <Route path="/Refund" component={FoodRefund} />
            <Route path="/Reservation" component={FoodReservation} />
            <Route path="/Contact" component={Contact} />
        </Switch>
        <Footer/>        
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));