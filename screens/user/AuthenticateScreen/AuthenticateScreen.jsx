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
        this.setState({
            formInputs: {
                ...this.state.formInputs,
                [id]: {
                    ...this.state.formInputs[id],
                    value: inputText
                }
            }
        }, () => {
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
            formIsValid: email.isValid && password.isValid ? true : false
        }, () => {
            let errors;
            if (this.state.formIsValid) return onAuthenticate(authType, userEmail, userPassword);

            errors = authenticationFormErrors.reduce((allErrors, currentError) => {
                if (!this.state.formInputs[currentError.id].isValid) {
                    allErrors = [...allErrors, currentError.errorText];
                }
                return allErrors;
            }, []);

            const transformedErrorMessages = errors.reduce((errMessage, err, index) => {
                errMessage += `${index + 1}. ${err}\n\n`
                return errMessage;
            }, '');

            Alert.alert('Invalid Form Inputs', transformedErrorMessages, [{ text: 'OK' }]);
        });
    }

    switchAuthModeHandler = () => {
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
        if (prevProps.idToken !== idToken) {
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
                    authenticationFormErrors.map(err => (
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


const mapStateToProps = state => ({
    error: state.rootAuth.error,
    errMessage: state.rootAuth.errMessage,
    idToken: state.rootAuth.idToken,
    loading: state.rootAuth.loading
})

const mapDispatchToProps = dispatch => ({
    onAuthenticate: (authType, email, password) => dispatch(authenticate(authType, email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateScreen);