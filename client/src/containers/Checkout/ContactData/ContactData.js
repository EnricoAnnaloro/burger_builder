import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Axios from '../../../axiosInstances/axios-orders';
import Loader from '../../../components/UI/Loader/Loader';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from  '../../withErrorHandler/withErrorHandler'
import * as Actions from '../../../store/actions/index'
import './ContactData.css';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                    userhelp: null
                },
                value: '',
                validity: {
                    isValid: false,
                    shouldValidate: true,
                    touched: false,
                    required: true
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                    userhelp: null
                },
                value: '',
                validity: {
                    isValid: false,
                    shouldValidate: true,
                    touched: false,
                    required: true,
                    minLength: 5
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                    userhelp: 'at least 3 character/numbers'
                },
                value: '',
                validity: {
                    isValid: false,
                    shouldValidate: true,
                    touched: false,
                    required: true,
                    minLength: 3
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                    userhelp: null
                },
                value: '',
                validity: {
                    isValid: false,
                    shouldValidate: true,
                    touched: false,
                    required: true
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                    userhelp: null
                },
                value: '',
                validity: {
                    isValid: false,
                    shouldValidate: true,
                    touched: false,
                    required: true
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: null, displayValue: "Delivery... " },
                        { value: "Regular", displayValue: "Regular" },
                        { value: "Fast", displayValue: "Fast" },
                        { value: "Fastest", displayValue: "Fastest" }
                    ],
                    userhelp: null
                },
                validity: {
                    isValid: false,
                    shouldValidate: false,
                    touched: false,
                    required: true
                },
                value: ''
            }
        },
        isFormValid: false
    }

    onOrderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formDataIdentifier in this.state.orderForm) {
            formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            order: formData
        }

        this.props.onPurchaseBurger(order);
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

        return isValid;
    }

    inputChangedHandler = (event, formElementID) => {
        const updatedForm = {
            ...this.state.orderForm
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

        this.setState({ orderForm: updatedForm, isFormValid: isFormValid });
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.onOrderHandler}>
            <h3>Enter your contact</h3>
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
            <Button btnType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
        </form>);

        if (this.props.isOrderLoading) {
            form = <Loader />
        }


        return (
            <div className="ContactData">                
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isOrderLoading: state.order.loading

    }
}

const mapDispatchToProps = dispatch => {
    return{
        onPurchaseBurger: orderData => dispatch(Actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, Axios));
