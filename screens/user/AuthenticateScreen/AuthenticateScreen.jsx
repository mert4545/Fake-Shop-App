import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import Button from '../../../shared/components/UI/Button/Button';
import FormInput from '../../../shared/components/UI/FormInput/FormInput';
import Form from '../../../shared/components/Form/Form';
import Text from '../../../shared/components/UI/Text/Text';

import { styles } from './styles';

import { checkInputValidity, Colors } from '../../../shared/utility';

import { authenticate } from '../../../store/actions/authActions';

class AuthenticateScreen extends Component {
    state = {
        formInputs: {
            email: {
                value: '',
                isValid: false,
                touched: false
            },
            password: {
                value: '',
                isValid: false,
                touched: false
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
        });
    }

    inputLostFocusHandler = id => {
        this.setState({
            formInputs: {
                ...this.state.formInputs,
                [id]: {
                    ...this.state.formInputs[id],
                    isValid: checkInputValidity(id, this.state.formInputs[id].value),
                    touched: true
                }
            }
        });
    }

    inputFocusedHandler = id => {
        this.setState({
            formInputs: {
                ...this.state.formInputs,
                [id]: {
                    ...this.state.formInputs[id],
                    touched: false
                }
            }
        });
    }

    authenticateUserHandler = (authType, email, password) => {
        const { onAuthenticate } = this.props;
        onAuthenticate(authType, email, password);
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

                <FormInput
                    label="Email"
                    errorTextHeader="Invalid Email"
                    errorText="Please enter a valid email address."
                    touched={this.state.formInputs.email.touched}
                    isValid={this.state.formInputs.email.isValid}
                    onChangeInput={this.inputTextChangedHandler.bind(this, 'email')}
                    onBlurInput={this.inputLostFocusHandler.bind(this, 'email')}
                    onFocusInput={this.inputFocusedHandler.bind(this, 'email')}
                    keyboardType="email-address"
                    returnKeyType="next"
                />
                <FormInput
                    label="Password"
                    errorTextHeader="Invalid Password"
                    errorText="Password should include at least one capital letter, small letter, digit and special character and at least be 8 characters long."
                    touched={this.state.formInputs.password.touched}
                    isValid={this.state.formInputs.password.isValid}
                    onChangeInput={this.inputTextChangedHandler.bind(this, 'password')}
                    onBlurInput={this.inputLostFocusHandler.bind(this, 'password')}
                    onFocusInput={this.inputFocusedHandler.bind(this, 'password')}
                    keyboardType="default"
                    secureTextEntry={true}
                    returnKeyType="done"
                />
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