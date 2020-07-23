import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {

        let summary = <Redirect to='/' />
        if (this.props.ingredients && !this.props.isPurchased) {
            summary = (
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    cancel={this.checkoutCancelledHandler}
                    continue={this.checkoutContinuedHandler} />
            );
            
        }

        return (
            <div>
                {summary}
                <Route path="/checkout/contact-data" component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        isPurchased: state.order.isPurchased
    }
}

export default connect(mapStateToProps)(Checkout);
