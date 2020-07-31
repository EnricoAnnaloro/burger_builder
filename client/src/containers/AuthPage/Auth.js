import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import BackgroundImage from '../../assets/images/backgroundAuth.jpg';
import { registerUser, login } from '../../store/actions/index';

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

        let isFormValid = true;
        for (let formIdentifier in updatedForm) {
            isFormValid = updatedForm[formIdentifier].validity.isValid && isFormValid;
        }

        updatedState.isFormValid = isFormValid;
        updatedState.form = updatedForm;

        console.log(updatedForm)

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


        let isFormValid = true;
        for (let formIdentifier in updatedForm) {
            isFormValid = updatedForm[formIdentifier].validity.isValid && isFormValid;
        }

        updatedState.isFormValid = isFormValid;
        updatedState.form = updatedForm;


        this.setState({ registerForm: updatedState });
    }

    onRegisterHandler = (event) => {
        event.preventDefault();

        const registrationInfo = {
            username: this.state.registerForm.form.username.value,
            password: this.state.registerForm.form.password.value,
            name: this.state.registerForm.form.name.value,
            last_name: this.state.registerForm.form.last_name.value,
            email: this.state.registerForm.form.email.value,
            phone_number: this.state.registerForm.form.phone_number.value
        }


        this.props.onUserRegistration(registrationInfo);
    }

    onLoginHandler = (event) => {
        event.preventDefault();

        this.props.onLoginHandler(this.state.loginForm.form.username.value, this.state.loginForm.form.password.value);
    }

    render() {
        const loginFormElements = [];
        for (let key in this.state.loginForm.form) {
            loginFormElements.push({
                id: key,
                config: this.state.loginForm.form[key]
            })
        }

        let loginForm = (<form onSubmit={this.onLoginHandler}>
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

        let registerForm = (<form onSubmit={this.onRegisterHandler}>
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
            <Button btnType="Success" /*disabled={!this.state.registerForm.isFormValid}*/>Sign Up!</Button>
        </form>);

        return (
            <Fragment>
                {this.props.isAuthenticated ? <Redirect to='/' /> : null }
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
            </Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoginHandler: (username, password) => dispatch(login(username, password)),
        onUserRegistration: userRegistrationForm => dispatch(registerUser(userRegistrationForm))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Auth);