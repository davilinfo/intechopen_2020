import React, { useState, useEffect } from 'react';
import api from './services/api';
import FoodItem from './components/FoodItem';
import FoodItemDetail from './components/FoodItemDetail';
import './styles.css';

//Componente: Bloco isolado de HTML, CSS e JS o qual não interfere no resto da aplicação. Nesse código está representado por uma função que renderiza algum HTML. (Regra de apenas 1 por arquivo)
//Propriedade: Informações que um componente PAI passa para o componente Filho. Ao utilizar propriedade função da propriedade utiliza (props) para passar propriedade
//Estado: Informações mantidas pelo componente (Lembrar: imutabilidade). Utilizar useState [variavel, funcaoParaAtualizarVariavel]

function App() {    
    var [foods, setFoods] = useState([]);      
    useEffect (() => {
      async function loadFoods(){
        console.log("loading foods");        
        const response = await api.get('/list');        
        foods = response.data.result;
        console.log(foods);
        setFoods(foods);
      }      
      
      loadFoods();             
    }, []);                 

    return (
        <div id="app">
            <div id="content">
                <div id="leftPan">
                <div id="welcome">
                    <h2></h2>
                    <img src="images/img_welcome.jpg" width="72" height="72" alt="" />
                    <p><span className="headline">Enjoy delicious food</span><br />
                    Seafood, meat, barbecue, menu and delicious dessert created for you. Payment and transactions details managed by Lisk Restaurant sidechain </p>
                    <div className="clear"></div>
                </div>
                <div id="services">
                    <h2></h2>
                    <p className="headline2">You have the option to choose the following entrances.</p>
                    <ul >
                    {                       
                        foods.filter(entrances=> entrances.category === 1 ).map(food => (
                            <FoodItem key={food.type} food={food}></FoodItem>
                        ))
                    }              
                    </ul>
                    <div className="clear"></div>
                    <br></br>
                    <p className="headline2">You have the option to choose the following menu.</p>
                    <ul >
                    {                       
                        foods.filter(menu=> menu.category === 2 ).map(food => (
                            <>
                            <FoodItem key={food.type} food={food}></FoodItem>
                            <br/>
                            </>                            
                        ))
                    }              
                    </ul>
                    <div className="clear"></div>
                    <br></br>
                    <p className="headline2">You have the option to choose the following desserts.</p>
                    <ul >
                    {                       
                        foods.filter(entrances=> entrances.category === 3 ).map(food => (
                            <FoodItem key={food.type} food={food}></FoodItem>
                        ))
                    }              
                    </ul>
                    <div className="clear"></div>
                    <br></br>
                    <p className="headline2">You have the option to choose the following beverages.</p>
                    <ul >
                    {                       
                        foods.filter(entrances=> entrances.category === 4 ).map(food => (
                            <FoodItem key={food.type} food={food}></FoodItem>
                        ))
                    }              
                    </ul>
                </div>
            </div>
            <div id="rightPan">
                <div id="recipes">
                    <h2></h2>                        
                    {                     
                        foods.map(food => (                             
                            <FoodItemDetail key={food.type} food={food}></FoodItemDetail>
                        ))                            
                    }                                               
                </div>
            </div>
            <div className="clear" id="end"></div>
            </div>            
        </div>
        
    );    
        
}
        
export default App;