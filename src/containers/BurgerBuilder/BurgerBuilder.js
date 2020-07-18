import React, { Fragment, Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axiosInstances/axios-orders'
import withErrorHandler from '../withErrorHandler/withErrorHandler'
import Loader from '../../components/UI/Loader/Loader'

// We record the prices for the ingredients as a global constant
const INGREDIENTS_PRICES = {
    salad: 0.50,
    bacon: 0.99,
    cheese: 0.99,
    meat: 1.99
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: null,
        purchesable: true,
        isModalOn: false,
        isOrderLoading: false,
        error: false
    };

    componentDidMount() {
        Axios.get("/ingredients.json")
            .then( response => {
                let price = 0;
                let ingredients = {
                    salad: 0,         
                    bacon: 0,        
                    cheese: 0,    
                    meat: 1 
                };

                for (let ingredient in response.data){
                    ingredients[ingredient] = response.data[ingredient]
                    price = price + (INGREDIENTS_PRICES[ingredient] * response.data[ingredient]);
                }
                this.setState({ingredients: ingredients, totalPrice: price});                    
            })
            .catch( error => {
                this.setState({error: error});
            } );
    };

    updatePurchaseState = (ingredients) => {
        // Called every time an ingredient is added or removed and checks if
        // purchase state of the burger has to change.

        let purchesableUpdate = false;
        if( ingredients['meat'] > 0){
            purchesableUpdate = true;
        }

        this.setState({purchesable: purchesableUpdate});
    };

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
    };

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
    };

    modalRenderHandler = () => {
        this.setState({isModalOn: true});
    };

    modalCancelHandler = () => {
        this.setState({isModalOn: false});
    };

    continueHandler = () => {
        let queryParams = [];

        for (let i in this.state.ingredients) {
            // creating the different combinations 'ingredient=quantity'
            queryParams.push(encodeURIComponent(i) + "=" + this.state.ingredients[i]);
            console.log(queryParams);
        }

        // merging all the combination in a string 'ingredient=quantity&ingredient=quantity&...'
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        });
    };

    // checkoutHandler = () => {
    //     this.setState({isOrderLoading: true});

    //     const order = {
    //         ingredients: this.state.ingredients,
    //         price: this.state.price,
    //         customer: {
    //             name: 'Renke Wang',
    //             address: {
    //                 Country: "Italy",
    //                 city: "Turin",
    //                 street: "streettest, 34",
    //                 zipCode: "203040"
    //             },
    //             email: "email@gmail.com"
    //         },
    //         deliveryMethod: "Fastest"
    //     }

    //     Axios.post("orders.json", order)
    //         .then( response => {
    //             this.setState({isOrderLoading: false, isModalOn: false})
    //         })
    //         .catch( error => {
    //             this.setState({isOrderLoading: false, isModalOn: false})
    //         });
    // }

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

        let burger = this.state.error ? <p style={{textAlign: "center"}}>Ingredients can't be loaded</p> : <Loader />;
        let orderSummary = null;

        if( this.state.ingredients ){  
            burger = (
                <Fragment>
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
            orderSummary = (
                <OrderSummary 
                    order={this.state} 
                    cancelOrder={this.modalCancelHandler} 
                    continue={this.continueHandler} 
                    isLoading={this.state.isOrderLoading}
                />
            );
        };

        return(
            <Fragment>
                <Modal show={this.state.isModalOn} modalClosed={this.modalCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}                               
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, Axios);