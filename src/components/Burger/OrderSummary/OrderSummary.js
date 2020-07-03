import React, {Fragment} from 'react'

const orderSummary = (props) => {

    const price = props.order.totalPrice;
    const ingredients = props.order.ingredients;

    const ingredientsList = Object.keys(ingredients).map(igKey => {
        return(
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span> - {ingredients[igKey]}
            </li>
        )
    });

    return(
        <Fragment>
            <h3>Your Order</h3>
            <ul>
                <li><strong>Ingredient - Quantity</strong></li>
                {ingredientsList}                
            </ul>
            <h4>Total Price: {price.toFixed(2)}$</h4>
        </Fragment>
    );
}

export default orderSummary;