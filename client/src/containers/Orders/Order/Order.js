import React from 'react';
import './Order.css'

const Order = (props) => {

    let ingredients = [];
    for (let ingredient in props.order.ingredients) {
        ingredients.push(<span key={ingredient}>{ingredient}: {props.order.ingredients[ingredient]}</span>)
    }

    return (
        <div className="SingleOrder">
            <p>Recipient: <strong>{props.order.order.name}</strong></p>
            <p>Address: <strong>{props.order.order.street + ' , ' + props.order.order.zipCode + ' , ' + props.order.order.country}</strong></p>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>{props.order.price.toFixed(2)} $</strong></p>
            <p>Delivery: <strong>{props.order.order.deliveryMethod}</strong></p>
        </div>
    );
}

export default Order;
