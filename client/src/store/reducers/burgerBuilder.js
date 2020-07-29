import * as actionTypes from '../actions/actionsTypes'

// We record the prices for the ingredients as a global constant
const INGREDIENTS_PRICES = {
    salad: 0.50,
    bacon: 1,
    cheese: 1,
    meat: 1.99
};

const initialState = {
    ingredients: null,
    totalPrice: 3,
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            }

        case actionTypes.SET_INGREDIENTS:
            let price = 1;
            let ingredients = {
                salad: 0,         
                bacon: 0,        
                cheese: 0,    
                meat: 1 
            };

            for (let ingredient in action.ingredients){
                ingredients[ingredient] = action.ingredients[ingredient]
                price = price + (INGREDIENTS_PRICES[ingredient] * action.ingredients[ingredient]);
            }

            return{
                ...state,
                ingredients: ingredients,
                totalPrice: price,
                error: false
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }
        
        case actionTypes.SET_PRESET_BURGER:          
            price = 1;
            ingredients = {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 1
            };

            for (let ingredient in action.ingredients) {
                ingredients[ingredient] = action.ingredients[ingredient]
                price = price + (INGREDIENTS_PRICES[ingredient] * action.ingredients[ingredient]);
            }

            return {
                ...state,
                ingredients: ingredients,
                totalPrice: price,
                error: false
            }

        default:
            return state;
    }

};

export default reducer;