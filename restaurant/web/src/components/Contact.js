import React from 'react';

import '../styles.css';

function Contact(){    

    return (        
        <div id="app">
            <div id="content">
                <br/>
                <br/> 
                <div align="center">                                
                    <div className="recipes_topic"> 
                        <img src="./images/davi_paris.jpg" width="200" height="150" alt="" />
                        <p><span className="headline">https://github.com/davilinfo</span> <br />
                        Author: Davi</p>
                        <p>Lisk community discord id: Dav1</p>
                        <p>Email: dav1@liskrestaurant.com</p>
                        <p>Scientific work: A Strategy for Mitigating Denial of Service Attacks on Nodes with Delegate Account of Lisk Blockchain</p>
                        <p>ACM book title: 2020 The 2nd International Conference on Blockchain Technology (ICBCT'20), March 12--14, 2020, Hilo, HI, USA</p>
                        <p>ACM digital library DOI: 10.1145/3390566.3391684</p>
                        <div className="clear"></div>
                    </div>
                    
                </div>     
            </div>
       </div>                    
    );
}


export default Contact;
