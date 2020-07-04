import React from 'react'
import './BurgerControl.css'

const burgerControl = (props) => {
    return(
        <div className="BurgerControl">
            <div className="Label">{props.label}</div>
            <div className="buttons">
                <button className="Less" onClick={props.removed} disabled={props.disabled}><i class="fa fa-minus"></i></button>
                <button className="More" onClick={props.added}><i class="fa fa-plus"></i></button>
            </div>
        </div>
    )
}

export default burgerControl;