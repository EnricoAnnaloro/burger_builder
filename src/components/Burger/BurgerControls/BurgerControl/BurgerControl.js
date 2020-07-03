import React from 'react'
import './BurgerControl.css'

const burgerControl = (props) => {
    return(
        <div className="BurgerControl">
            <div className="Label">{props.label}</div>
            <button className="Less" onClick={props.removed} disabled={props.disabled}>less</button>
            <button className="More" onClick={props.added}>MORE</button>
        </div>
    )
}

export default burgerControl;