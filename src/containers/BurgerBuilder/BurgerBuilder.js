import React, { Fragment, Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

// We record the prices for the ingredients as a global constant
const INGREDIENTS_PRICES = {
    salad: 0.50,
    bacon: 0.99,
    cheese: 0.99,
    meat: 1.99
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0, 
            cheese: 0,
            meat: 1
        },
        totalPrice: 4,
        purchesable: true,
        isModalOn: false
    }

    updatePurchaseState = (ingredients) => {
        // Called every time an ingredient is added or removed and checks if
        // purchase state of the burger has to change.

        let purchesableUpdate = false;
        if( ingredients['meat'] > 0){
            purchesableUpdate = true;
        }

        this.setState({purchesable: purchesableUpdate});
    }

    addIngredientHandler = (type) => {
        // Always remeber that when updating we don't wanna modify directly
        // the state values, therefore we report all the variables we want to 
        // modify into other variable first

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        // We also modify the price property of the state in this function call
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENTS_PRICES[type];
        const updatedPrice = oldPrice + priceAddition;

        //Update the state
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0) { return; } //To not go negative in the ingredients

        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENTS_PRICES[type];
        const updatedPrice = oldPrice - priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});

        this.updatePurchaseState(updatedIngredients);
    }

    modalRenderHandler = () => {
        this.setState({isModalOn: true});
    }

    modalCancelHandler = () => {
        this.setState({isModalOn: false});
    }

    render(){

        // When a ingredient count goes to 0 we want to disable the 'remove ingredient' button
        // to do so we want a list of true/false values for each ingredient, depending on its state
        // The following lines transform an object of 
        // ingredients: {                   ingredients{
        //     salad: 0,                        salad: true,
        //     bacon: 0,                        bacon: false,
        //     cheese: 0,     -------->         cheese: true,
        //     meat: 0                          meet: true
        // }                                }
        const disableInfo = { ...this.state.ingredients};
        for(let key in disableInfo){ disableInfo[key] = disableInfo[key] <= 0}

        return(
            <Fragment>
                <Modal show={this.state.isModalOn} modalClosed={this.modalCancelHandler}>
                    <OrderSummary order={this.state} />
                </Modal>
                <div>
                    <Burger ingredients={this.state.ingredients}/>
                </div>
                <div>
                    <BurgerControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        disabled={disableInfo}
                        purchesable={this.state.purchesable}
                        order={this.modalRenderHandler}
                    />
                </div>
            </Fragment>
        );
    }
}

export default BurgerBuilder;