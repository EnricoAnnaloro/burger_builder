import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import Axios from '../../../axiosInstances/axios-orders'
import Loader from '../../../components/UI/Loader/Loader'
import Input from '../../../components/UI/Input/Input'
import './ContactData.css'

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
                    required: true
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
                    required: true,
                    minLength: 5,
                    maxLength: 5
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
                    required: true
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: "Regular", displayValue: "Regular"},
                        {value: "Fast", displayValue: "Fast"},
                        {value: "Fastest", displayValue: "Fastest"}
                    ]
                },
                value: ''
            }
        },
        isOrderLoading: false
    }

    onOrderHandler = ( event ) => {
        event.preventDefault();
        this.setState({ isOrderLoading: true });

        const formData = {};
        for (let formDataIdentifier in this.state.orderForm){
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
            console.log(`${value.length} - ${ rules.minLength}`)
            console.log(value.lenght >= rules.minLength);
            isValid = value.lenght >= rules.minLength;
            console.log(isValid);
        }
        
        
        if (rules.maxLength && isValid) {
            console.log(`${value.length} - ${ rules.maxLength}`)
            isValid = value.lenght <= rules.maxLength;
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
        updatedFormElement.validity = updatedFormElementValidity;
        updatedForm[formElementID] = updatedFormElement;

        console.log(updatedForm);
        this.setState({orderForm: updatedForm});
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.onOrderHandler}>
                        {formElements.map( element => {
                            return(
                                <Input 
                                    key={element.id}
                                    elementType={element.config.elementType}
                                    elementConfig={element.config.elementConfig}
                                    value={element.value}
                                    changed={(event) => this.inputChangedHandler(event, element.id)} />
                            )
                        })}
                        <Button btnType="Success">ORDER</Button>
                    </form>);

        if(this.state.isOrderLoading){
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

export default ContactData;
