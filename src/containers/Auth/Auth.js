import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import './Auth.css'

class Auth extends Component {

    state = {
        loginForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                validity: {
                    isValid: false,
                    shouldValidate: true,
                    touched: false,
                    required: true,
                    minLength: 7,
                    requiresNum: true,
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validity: {
                    isValid: false,
                    shouldValidate: true,
                    touched: false,
                    required: true,
                    minLength: 7,
                    requiresNum: true,
                    requiresSpecialChar: true,
                }
            }
        },
        isFormValid: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required && isValid) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
        }


        if (rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength;
        }

        if (rules.requiresNum && isValid) {
            isValid = /[1234567890]/g.test(value);
        }

        if (rules.requiresSpecialChar && isValid) {
            isValid = /[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(value);
            console.log(isValid);
        }

        return isValid;
    }

    inputChangedHandler = (event, formElementID) => {
        const updatedForm = {
            ...this.state.loginForm
        };

        const updatedFormElement = {
            ...updatedForm[formElementID]
        };

        const updatedFormElementValidity = {
            ...updatedFormElement.validity
        }

        updatedFormElement.value = event.target.value;
        updatedFormElementValidity.isValid = this.checkValidity(updatedFormElement.value, updatedFormElementValidity);
        updatedFormElementValidity.touched = true;
        updatedFormElement.validity = updatedFormElementValidity;
        updatedForm[formElementID] = updatedFormElement;

        let isFormValid = true;
        for (let formIdentifier in updatedForm) {
            isFormValid = updatedForm[formIdentifier].validity.isValid && isFormValid;
        }

        this.setState({ loginForm: updatedForm, isFormValid: isFormValid });
    }

    onOrderHandler = () => {
        console.log("HANDLED")
    }

    render() {
        const formElements = [];
        for (let key in this.state.loginForm) {
            formElements.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        let form = (<form onSubmit={this.onOrderHandler}>
            {formElements.map(element => {
                    return (
                    <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.value}
                        valid={element.config.validity.isValid}
                        shouldValidate={element.config.validity.shouldValidate}
                        touched={element.config.validity.touched}
                        changed={(event) => this.inputChangedHandler(event, element.id)} />
                )
            })}
            <Button btnType="Success" disabled={!this.state.isFormValid}>Login</Button>
        </form>);

        return (
            <div className="Auth">
                <div className="LoginForm">
                    <h3>Login</h3>
                    {form}
                </div>
            </div>
        );
    }
}

export default Auth;
