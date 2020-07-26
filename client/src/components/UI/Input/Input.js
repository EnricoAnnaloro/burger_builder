import React from 'react';
import './Input.css'

const Input = (props) => {

    let inputElement = null;
    let userHelp = null;
    let styleClasses = "InputElement";

    if ( !props.valid && props.shouldValidate && props.touched) {
        styleClasses = "InputElement Invalid"
        userHelp = props.elementConfig.userhelp ? <label style={{fontSize: '10px'}}>{props.elementConfig.userhelp}</label> : null;
    }

    switch (props.elementType) {
        case "input":
            inputElement = <input className={styleClasses} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;

        case "textarea":
            inputElement = <textarea className={styleClasses} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;

        case "select":
            inputElement = (
                <select 
                    className={styleClasses}
                    onChange={props.changed}
                    value={props.value}>
                    {props.elementConfig.options.map( option => {
                        return (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    )})}                     
                </select>
            )
            break;
    
        default:
            inputElement = <input className={styleClasses} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
            {userHelp}
        </div>
    );
}

export default Input;
