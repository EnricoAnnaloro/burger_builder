import React from 'react';
import Burger from '../Burger/Burger'
import Button from '../UI/Button/Button'
import './CheckoutSummary.css'

const CheckoutSummary = ( props ) => {

    return (
        <div className="CheckoutSummary">
            <h1>Hope you find it tasty!</h1>
            <div className="burgerCheckoutSummary">
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>

        </div>
    );
}

export default CheckoutSummary;
