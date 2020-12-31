import React from 'react';

import '../styles.css';

function History(){    

    return (
        <div id="app">
            <div id="content">
                <br/>
                <br/>
                <br/>
                <p className="headline2" align="center">Our History</p>                            
                <div className="headline2" align="center"><p> Luxury restaurant was created as a Proof of Concept for Lisk sidechain blockchain.</p></div>                    
                <div className="headline2" align="center"><p>The goal is to demonstrate how easy can be to create a restaurant based backend that consumes the restaurant sidechain.</p></div>                    
                <div className="headline2" align="center"><p>
                This site represents a sea food luxury restaurant. It's possible to list all the food offered by this restaurant in the home page.
                </p></div>
                <div className="headline2" align="center">
                    Also, it is possible to click on a food preference and command a desired food option. 
                </div>
                <div className="headline2" align="center">    
                    Once commanded the food then a FoodTransaction will be created
                    in the restaurant sidechain, 
                    <br/>
                    the transaction value will be placed on the restaurant Lisk address and the value will be debited from
                    the sender wallet.
                </div>                    
                <div className="clear"></div>    
                <br/>
                <br/>
                <br/>                           
            </div>
        </div>
    );
}

export default History;