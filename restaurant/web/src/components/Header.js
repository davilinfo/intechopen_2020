import React from "react";
import { NavLink } from "react-router-dom";
import '../styles.css';

function Header() {
  return (            
    <div id="header"> 
    <img src="./images/logo.jpg" width="438" height="93" alt="" id="logo" /> <img src="./images/slogan.gif" width="190" height="81" alt="" id="slogan" />       
        <ul className="menu">
            <li className="btn_1"><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
            <li className="line"></li>
            <li className="btn_2"><NavLink exact activeClassName="active" to="/History">Our History</NavLink></li>
            <li className="line"></li>            
            <li className="btn_8"><NavLink exact activeClassName="active" to="/Refund">Refund</NavLink></li>
            <li className="line"></li>
            <li className="btn_7"><NavLink exact activeClassName="active" to="/Reservation">Reservations</NavLink></li>
            <li className="line"></li>
            <li className="btn_6"><NavLink exact activeClassName="active" to="/Contact">Contacts</NavLink></li>
        </ul>      
    </div>    
  );
}
export default Header;