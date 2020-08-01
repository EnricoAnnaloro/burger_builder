import React from 'react';
import './Order.css';

import Burger from '../../../components/Burger/Burger';



const Order = (props) => {

    let ingredients = [];
    for (let ingredient in props.order.ingredients) {
        ingredients.push(<span key={ingredient}>{ingredient}: {props.order.ingredients[ingredient]}</span>)
    }

    return (
        <div className="SingleOrder">
            <div className="OrderInfo">
                <p>Recipient: <strong>{props.order.order.name}</strong></p>
                <p>Address: <strong>{props.order.order.street + ' , ' + props.order.order.zipCode + ' , ' + props.order.order.country}</strong></p>
                <p>Ingredients: {ingredients}</p>
                <p>Price: <strong>{props.order.price.toFixed(2)} $</strong></p>
                <p>Delivery: <strong>{props.order.order.deliveryMethod}</strong></p>
                <p>Ordered on <strong>{props.order.createdAt.substring(0, 10)}</strong> at <strong>{props.order.createdAt.substring(12, 16)}</strong></p>
            </div>
            <div className="BurgerDisplay">
                < Burger ingredients={props.order.ingredients} />
            </div>
        </div>
    );
}

export default Order;
