import React, {Fragment} from 'react'
import Button from '../../UI/Button/Button'
import Loader from '../../UI/Loader/Loader'
import './OrderSummary.css'

const orderSummary = (props) => {

    const price = props.price;
    const ingredients = props.ingredients;

    const ingredientsList = Object.keys(ingredients).map(igKey => {
        return(
            <p key={igKey}>
                <strong style={{textTransform: 'capitalize'}}>{igKey}</strong> <span className="price">{ingredients[igKey]}</span>
            </p>
        )
    });

    let orderButtonContent = "CHECKOUT";
    if (props.isLoading){
        orderButtonContent = <Loader />;
    }

    const divStyles = {
        display: 'flex',
        justifyContent: 'space-between'
    }

    return(
        <Fragment>
            <h2 style={{textAlign: "center"}}>Your order<span style={{color: "black", marginLeft: '2%'}}><i className="fa fa-shopping-cart"></i></span></h2>
            <p><strong>Ingredient</strong> <span className="price">Quantity</span></p>
            <hr></hr>
                {ingredientsList}                
            <hr></hr>
            <p>Total <span className="price"  style={{color: "black"}}><b>{price.toFixed(2)}$</b></span></p>            
            <div style={divStyles}>
                <Button btnType='Danger' clicked={props.cancelOrder}>CANCEL</Button>
                <Button btnType='Success' clicked={props.continue}>{orderButtonContent}</Button>
            </div>
        </Fragment>
    );
}

export default orderSummary;