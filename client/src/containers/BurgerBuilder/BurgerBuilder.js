import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import PresetBurgers from '../../components/Burger/PresetBurgers/PresetBurgers'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loader from '../../components/UI/Loader/Loader';
import * as Actions from '../../store/actions/index';
import BackgroundImage from '../../assets/images/background.jpg';
import Button from '../../components/UI/Button/Button';
import './BurgerBuilder.css';
import { Redirect } from 'react-router-dom';

class BurgerBuilder extends Component {

    state = {
        purchesable: true,
        isModalOn: false,
        isOrderLoading: false,
        pageMustReload: false
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

    pageRefreshHandler = () => {
        window.location.reload(false);
    }

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

        let burger = this.props.error ?
            <div className="BurgerBuilderPage">
                <Modal show={true}>
                    <p style={{ textAlign: "center" }}>An error occurred while fetching data</p>
                    <p style={{ textAlign: "center" }}>Please check your connection and try refreshing the page</p>
                    <i className="far fa-5x fa-frown"></i>
                    <Button btnType="Success" clicked={this.pageRefreshHandler}>Refresh Page</Button>
                </Modal>
            </div> : <Loader />;
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
                <Modal show={this.props.hasBeenPurchased} modalClosed={this.props.onInitPurchase}>
                    <p>Purchase Successfull</p>
                    <i className="fas fa-4x fa-thumbs-up"></i>
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
        error: state.burgerBuilder.error,
        hasBeenPurchased: state.orders.isPurchased
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