import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import Burger from '../../components/Burger/Burger';
import Button from '../../components/UI/Button/Button';

import './Checkout.css'

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentDidUpdate() {
        let elem = document.querySelector('.ContactData');
        let rect = elem.getBoundingClientRect();
        console.log(rect.y)
        window.scrollTo({ top: rect.y - 100, left: 0, behavior: 'smooth' });
    }

    render() {

        let summary = <Redirect to='/' />
        if (this.props.ingredients && !this.props.isPurchased) {
            summary = (
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    cancel={this.checkoutCancelledHandler}
                    continue={this.checkoutContinuedHandler}
                    displayContinue={true}
                />
            );
        }

        if (this.props.ingredients && this.props.location.pathname === "/checkout/contact-data") {
            summary = (
                <div className="CheckoutSummary">
                    <h1>Hope you find it tasty!</h1>
                    <div className="burgerCheckoutSummary">
                        <Burger ingredients={this.props.ingredients} />
                    </div>
                    <Button btnType="Danger" clicked={this.checkoutCancelledHandler}>CANCEL</Button>
                </div>
            );
        }

        return (
            <div className="CheckoutPage">
                {summary}
                <Route path="/checkout/contact-data" component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        isPurchased: state.orders.isPurchased
    }
}

export default connect(mapStateToProps)(Checkout);
