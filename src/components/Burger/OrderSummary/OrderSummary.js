import React, {Fragment} from 'react'
import Button from '../../UI/Button/Button'
import './OrderSummary.css'

const orderSummary = (props) => {

    const price = props.order.totalPrice;
    const ingredients = props.order.ingredients;

    const ingredientsList = Object.keys(ingredients).map(igKey => {
        return(
            <p key={igKey}>
                <strong style={{textTransform: 'capitalize'}}>{igKey}</strong> <span class="price">{ingredients[igKey]}</span>
            </p>
        )
    });

    const divStyles = {
        display: 'flex',
        justifyContent: 'space-between'
    }

    return(
        <Fragment>
            <h2 style={{textAlign: "center"}}>Your order<span style={{color: "black", marginLeft: '2%'}}><i class="fa fa-shopping-cart"></i></span></h2>
            <p><strong>Ingredient</strong> <span class="price">Quantity</span></p>
            <hr></hr>
                {ingredientsList}                
            <hr></hr>
    <p>Total <span class="price"  style={{color: "black"}}><b>{price.toFixed(2)}$</b></span></p>            
            <div style={divStyles}>
                <Button btnType='Danger' clicked={props.cancelOrder}>CANCEL</Button>
                <Button btnType='Success' clicked={props.checkout}>CHECKOUT</Button>
            </div>
        </Fragment>
    );
}

export default orderSummary;