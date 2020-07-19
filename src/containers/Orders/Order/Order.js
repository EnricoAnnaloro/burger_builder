import React from 'react';
import './Order.css'

const Order = ( props ) => {

    console.log(props);

    let ingredients = [];
    for (let ingredient in props.ingredients){
        ingredients.push(<span key={ingredient}>{ingredient}: {props.ingredients[ingredient]}</span>)
    }

    return (
        <div className="SingleOrder">
                <p>Ingredients: {ingredients}</p>                
                <p>Price: <strong>{props.price.toFixed(2)} $</strong></p>
        </div>
    );
}

export default Order;
