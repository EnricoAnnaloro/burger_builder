import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route } from 'react-router-dom'

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
        price: 0
    }

    componentDidMount() {
        const queryString = new URLSearchParams(this.props.location.search);
        let  ingredients = {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        }

        let price = 0;
        
        for (let param of queryString.entries()) {
            console.log("param");
            console.log(param);
            if(param[0] === "price"){
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ ingredients: ingredients, price: price });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {

        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancel={this.checkoutCancelledHandler}
                    continue={this.checkoutContinuedHandler} />
                <Route 
                    path="/checkout/contact-data"
                    render={ ( props ) => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />} />
            </div>
        );
    }
}

export default Checkout;
