import React, {Fragment} from 'react'
import BurgerControl from './BurgerControl/BurgerControl'
import './BurgerControls.css'

// We create a constant to easily implement different controls if we wanted to.
// NB that the 'type' should match the ones in the Burger Component.

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
]

const burgerControls = (props) => {
    return(
        <Fragment>
            <div className="BurgerControls">
                <p id="price">Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
                {controls.map(ctrl => (
                    <BurgerControl 
                        key={ctrl.label}
                        label={ctrl.label}
                        added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}
                         />
                ))}
                <button className="OrderButton" disabled={!props.purchesable} onClick={props.order}>Check out!</button>
            </div>
        </Fragment>
    )
}

export default burgerControls;