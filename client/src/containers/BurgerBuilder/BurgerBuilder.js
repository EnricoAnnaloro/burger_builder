import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import PresetBurgers from '../../components/Burger/PresetBurgers/PresetBurgers'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from '../../axiosInstances/axios-orders';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import Loader from '../../components/UI/Loader/Loader';
import * as Actions from '../../store/actions/index';
import BackgroundImage from '../../assets/images/background.jpg';

import './BurgerBuilder.css';

class BurgerBuilder extends Component {

    state = {
        purchesable: true,
        isModalOn: false,
        isOrderLoading: false,
    };

    componentDidMount() {
        this.props.onInitIngredients()
    };

    updatePurchaseState = () => {
        return this.props.ingredients['meat'] > 0;
    };

    modalRenderHandler = () => {
        this.setState({ isModalOn: true });
    };

    modalCancelHandler = () => {
        this.setState({ isModalOn: false });
    };

    continueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {

        // When a ingredient count goes to 0 we want to disable the 'remove ingredient' button
        // to do so we want a list of true/false values for each ingredient, depending on its state
        // The following lines transform an object of 
        // ingredients: {                   ingredients{
        //     salad: 0,                        salad: true,
        //     bacon: 0,                        bacon: false,
        //     cheese: 0,     -------->         cheese: true,
        //     meat: 0                          meet: true
        // }                                }
        const disableInfo = { ...this.props.ingredients };
        for (let key in disableInfo) { disableInfo[key] = disableInfo[key] <= 0 }

        let burger = this.props.error ? <p style={{ textAlign: "center" }}>Ingredients can't be loaded</p> : <Loader />;
        let orderSummary = null;
        
        if (this.props.ingredients) {
            burger = (
                <div className="BurgerBuilderPage">
                    <div className="BurgerSide">
                        <Burger ingredients={this.props.ingredients} />
                    </div>
                    <div>
                        <BurgerControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            price={this.props.price}
                            disabled={disableInfo}
                            purchesable={this.updatePurchaseState()}
                            order={this.modalRenderHandler}
                        />
                    </div>
                </div>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    price={this.props.price}
                    cancelOrder={this.modalCancelHandler}
                    continue={this.continueHandler}
                    isLoading={this.state.isOrderLoading}
                />
            );
        };

        return (
            <Fragment>
                <Modal show={this.state.isModalOn} modalClosed={this.modalCancelHandler}>
                    {orderSummary}
                </Modal>
                <PresetBurgers />
                {burger}
                <div className="BackgroundImage">
                    <img src={BackgroundImage} alt=""></img>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(Actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(Actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(Actions.initIngredients()),
        onInitPurchase: () => dispatch(Actions.purchaseInit())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);