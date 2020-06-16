import React, { Component } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';

import Button from '../../../shared/components/UI/Button/Button';
import FormInput from '../../../shared/components/UI/FormInput/FormInput';
import Form from '../../../shared/components/Form/Form';
import Text from '../../../shared/components/UI/Text/Text';

import { styles } from './styles';

import { checkInputValidity, Colors, authenticationFormErrors } from '../../../shared/utility';

import { authenticate } from '../../../store/actions/authActions';

class AuthenticateScreen extends Component {
    state = {
        formInputs: {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        formIsValid: false,
        authType: 'signup'
    }

    inputTextChangedHandler = (id, inputText) => {
        this.setState({  // update input field value
            formInputs: {
                ...this.state.formInputs,
                [id]: {
                    ...this.state.formInputs[id],
                    value: inputText
                }
            }
        }, () => {  // this callback is called after updating input field value in order to check its validity.
            this.setState({
                formInputs: {
                    ...this.state.formInputs,
                    [id]: {
                        ...this.state.formInputs[id],
                        isValid: checkInputValidity(id, this.state.formInputs[id].value)
                    }
                }
            })
        });
    }

    authenticateUserHandler = (authType, userEmail, userPassword) => {
        const { onAuthenticate } = this.props;
        const { email, password } = this.state.formInputs;

        this.setState({
            formIsValid: email.isValid && password.isValid ? true : false  // check if overall form is valid. 
        }, () => {  // after checking form validity, trigger this callback function. (it is valid only when all input fields are individually valid)
            let errors;
            if (this.state.formIsValid) return onAuthenticate(authType, userEmail, userPassword);  // if overall form is valid, authenticate user

            errors = authenticationFormErrors.reduce((allErrors, currentError) => {  // if overall form is NOT valid,
                if (!this.state.formInputs[currentError.id].isValid) {
                    allErrors = [...allErrors, currentError.errorText];  // collect each respective error for each input field for which an invalid input is provided
                }
                return allErrors;
            }, []);

            const transformedErrorMessages = errors.reduce((errMessage, err, index) => {  // extract only error messages from each error object
                errMessage += `${index + 1}. ${err}\n\n`
                return errMessage;
            }, '');

            Alert.alert('Invalid Form Inputs', transformedErrorMessages, [{ text: 'OK' }]);  // alert user about all possible errors
        });
    }

    switchAuthModeHandler = () => {  // determine authentication mode for user. 
        if (this.state.authType === 'signup')
            return this.setState({
                authType: 'login'
            });

        this.setState({
            authType: 'signup'
        });
    }

    componentDidUpdate(prevProps) {
        const { idToken, navigation } = this.props;
        if (prevProps.idToken !== idToken) {  // whenever user has valid token and s/he has been authenticated, navigate user to Main page
            navigation.navigate('Shop');
        }
    }

    render() {
        const { buttonContainer, button, switchBtn } = styles;
        const { email, password } = this.state.formInputs;
        const { error, errMessage, loading } = this.props;

        return (
            <Form>
                {error && <Text style={{ color: '#000' }}>{errMessage}</Text>}

                {
                    authenticationFormErrors.map(err => (  // render each form input field appropriately
                        <FormInput
                            key={err.errorText}
                            label={err.label}
                            errorTextHeader={err.errorTextHeader}
                            errorText={err.errorText}
                            isValid={this.state.formInputs[err.id].isValid}
                            onChangeInput={this.inputTextChangedHandler.bind(this, err.id)}
                            keyboardType={`${err.id === 'email' ? 'email-address' : 'default'}`}
                            returnKeyType={`${err.id === 'password' ? 'done' : 'next'}`}
                        />
                    ))
                }
                <View style={buttonContainer}>
                    {loading ? <ActivityIndicator size="large" color={Colors.primary} /> : <Button
                        style={button}
                        label={`${this.state.authType === 'login' ? 'LOGIN' : 'SIGNUP'}`}
                        onClick={this.authenticateUserHandler.bind(this, this.state.authType, email.value, password.value)}
                    />}
                    <Button
                        style={{ ...button, ...switchBtn }}
                        label={`Switch to ${this.state.authType === 'login' ? 'SIGNUP' : 'LOGIN'}`}
                        onClick={this.switchAuthModeHandler} />
                </View>
            </Form>
        );
    }
}


// Get Required State(s) from central store
const mapStateToProps = state => ({
    error: state.rootAuth.error,
    errMessage: state.rootAuth.errMessage,
    idToken: state.rootAuth.idToken,
    loading: state.rootAuth.loading
});

// Get Required Action(s) from central store
const mapDispatchToProps = dispatch => ({
    onAuthenticate: (authType, email, password) => dispatch(authenticate(authType, email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateScreen);