import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import './Burger.css';

const burger = (props) => {

    // We need to tranform the props.ingredients object into an array that 
    // represents the amount of each ingredient.
    // To do so we use the .keys() method of Object which extracts the keys
    // of a given object into an array.
    // This will give a sets of strings ['salad', 'bacon', 'cheese', 'meat']
    // We then concatenate this result with a map() method which performs a 
    // function for each element of the array.

    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        // We need to transmorm this string value to an array of how manny
        // such elements we have recorded for igKey (eg. if we have 2 cheese 
        // we want an array with ['', ''] ), to do so we use the 
        // function Array(n) which returns an array with n empty spaces.

        // With this found array we apply another map() to extract each index
        // of the array and combining it with the igKey to result in a unique 
        // key value to pass to <BurgerIngredient/> (eg. "cheese1" or "cheese2")

        // As a type we will simply pass igKey being it the required input.
        // NB. This means that in BurgerBuilder.js in the state.ingredients, the
        // spelling of the ingredients must match the one used in BurgerIngredient.

        // Using the reduce() method we return as transformedIngredient an array
        // of JSX objects. This is done to consider the case where no objects (no ingredients)
        // are selected which is then checked uding .lenght.

        return [...Array(props.ingredients[igKey])]
            .map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
    }).reduce((arr, el) => {
        return arr.concat(el);
    });
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please select some ingredients!</p>;
    }

    let pattyRequired = null;
    if(props.ingredients['meat'] <= 0){
        pattyRequired = <p>Please select at least <strong>1</strong> meat</p>;
    }

    return(
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            {pattyRequired}
            <BurgerIngredient type="bread-bottom" />       
        </div>
    );
}

export default burger;