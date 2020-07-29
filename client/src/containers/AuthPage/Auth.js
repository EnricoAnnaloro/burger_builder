import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as Actions from '../../store/actions/index';
import BackgroundImage from '../../assets/images/backgroundAuth.jpg';

import './Auth.css';

class Auth extends Component {

    state = {
        loginForm: {
            form: {
                username: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Username',
                        userhelp: 'At least 7 character, with one number'
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
                        placeholder: 'Password',
                        userhelp: 'At least 7 character, with one number and one special character'
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
        },
        registerForm: {
            form: {
                username: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Username',
                        userhelp: 'At least 7 character, with one number'
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
                        placeholder: 'Password',
                        userhelp: 'At least 7 character, with one number and one special character'
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
                },
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'First Name',
                        userhelp: ''
                    },
                    value: '',
                    validity: {
                        isValid: false,
                        shouldValidate: true,
                        touched: false,
                        required: true
                    }
                },
                last_name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Last Name',
                        userhelp: ''
                    },
                    value: '',
                    validity: {
                        isValid: false,
                        shouldValidate: true,
                        touched: false,
                        required: true
                    }
                },
                phone_number: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Phone Number',
                        userhelp: ''
                    },
                    value: '',
                    validity: {
                        isValid: false,
                        shouldValidate: true,
                        touched: false,
                        required: true,
                        minLength: 5,
                        requiresNum: true,
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
                }
            },
            isFormValid: false
        }
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

    loginInputChangedHandler = (event, formElementID) => {
        const updatedState = {
            ...this.state.loginForm
        }

        const updatedForm = {
            ...updatedState.form
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

        console.log(updatedForm)

        let isFormValid = true;
        for (let formIdentifier in updatedForm) {
            console.log(formIdentifier + updatedForm[formIdentifier].validity.isValid)
            isFormValid = updatedForm[formIdentifier].validity.isValid && isFormValid;
        }

        updatedState.isFormValid = isFormValid;
        updatedState.form = updatedForm;

        this.setState({ loginForm: updatedState });
    }

    registerInputChangedHandler = (event, formElementID) => {

        const updatedState = {
            ...this.state.registerForm
        }

        const updatedForm = {
            ...updatedState.form
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

        console.log(updatedForm)

        let isFormValid = true;
        for (let formIdentifier in updatedForm) {
            console.log(formIdentifier + updatedForm[formIdentifier].validity.isValid)
            isFormValid = updatedForm[formIdentifier].validity.isValid && isFormValid;
        }

        updatedState.isFormValid = isFormValid;
        updatedState.form = updatedForm;


        this.setState({ registerForm: updatedState });
    }

    onloginHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.loginForm.username, this.state.loginForm.password);
    }

    render() {
        const loginFormElements = [];
        for (let key in this.state.loginForm.form) {
            loginFormElements.push({
                id: key,
                config: this.state.loginForm.form[key]
            })
        }

        let loginForm = (<form onSubmit={this.onloginHandler}>
            {loginFormElements.map(element => {
                return (
                    <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.value}
                        valid={element.config.validity.isValid}
                        shouldValidate={element.config.validity.shouldValidate}
                        touched={element.config.validity.touched}
                        changed={(event) => this.loginInputChangedHandler(event, element.id)} />
                )
            })}
            <Button btnType="Success" disabled={!this.state.loginForm.isFormValid}>Login</Button>
        </form>);

        const registerFormElements = [];
        for (let key in this.state.registerForm.form) {
            registerFormElements.push({
                id: key,
                config: this.state.registerForm.form[key]
            })
        }

        let registerForm = (<form onSubmit={this.onloginHandler}>
            {registerFormElements.map(element => {
                return (
                    <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.value}
                        valid={element.config.validity.isValid}
                        shouldValidate={element.config.validity.shouldValidate}
                        touched={element.config.validity.touched}
                        changed={(event) => this.registerInputChangedHandler(event, element.id)} />
                )
            })}
            <Button btnType="Success" disabled={!this.state.registerForm.isFormValid}>Sign Up!</Button>
        </form>);

        return (
            <div className="AuthenticationPage">
                <div className="LoginForm">
                    <h3>Login</h3>
                    {loginForm}
                </div>
                <div className="RegisterForm">
                    <h3>Sign Up</h3>
                    {registerForm}
                </div>
                <div className="BackgroundImage">
                    <img src={BackgroundImage} alt=""></img>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onloginHandler: (username, password) => dispatch(Actions.login(username, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);