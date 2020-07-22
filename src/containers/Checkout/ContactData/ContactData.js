import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Axios from '../../../axiosInstances/axios-orders';
import Loader from '../../../components/UI/Loader/Loader';
import Input from '../../../components/UI/Input/Input';
import './ContactData.css';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
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
                    placeholder: 'Street'
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
                    placeholder: 'ZIP Code'
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
                    placeholder: 'Country'
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
                    placeholder: 'Email'
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
                    ]
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
        isOrderLoading: false,
        isFormValid: false
    }

    onOrderHandler = (event) => {
        event.preventDefault();
        this.setState({ isOrderLoading: true });

        const formData = {};
        for (let formDataIdentifier in this.state.orderForm) {
            formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            order: formData
        }

        Axios.post("orders.json", order)
            .then(response => {
                this.setState({ isOrderLoading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ isOrderLoading: false })
            });
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
            {formElements.map(element => {
                console.log(element.config.validity['isValid'])
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

        if (this.state.isOrderLoading) {
            form = <Loader />
        }


        return (
            <div className="ContactData">
                <h4>Enter your contact</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);