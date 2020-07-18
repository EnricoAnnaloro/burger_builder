import React from 'react';
import Burger from '../Burger/Burger'
import Button from '../UI/Button/Button'

const CheckoutSummary = ( props ) => {

    return (
        <div>
            <h1>Hope you find it tasty!</h1>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>ORDER</Button>

        </div>
    );
}

export default CheckoutSummary;
