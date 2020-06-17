import React, { useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';

import { authSuccess } from '../../store/actions/authActions';

import { Colors } from '../../shared/utility';
import { styles } from './styles';


class StartupScreen extends Component {  // this screen will be used as a transition screen in which a user has a currently valid token and has active auto login state or not   

    tryAutoAuthentication = async () => {  // this handler function determine whether a user can automatically login or not
        const { onAutoLogin, navigation } = this.props;


        const userData = await AsyncStorage.getItem('userData');  // get stored user data from storage
        if (!userData) {  // upon invalid user credentials, redirect user to authentication form page
            navigation.navigate('Authentication');
            return;
        }
        const transformedUserData = JSON.parse(userData);
        const { token, userId, expirationDate } = transformedUserData;

        const expDate = new Date(expirationDate);
        if (expDate <= new Date() || !token || !userId) {  // if token is NOT valid and its validation date expires or invalid token/userId are obtained from storage
            navigation.navigate('Authentication'); // redirect user to authentication form page
            return;
        }

        navigation.navigate('Shop');  // upon valid user credentials, navigate user to Main page
        onAutoLogin(userId, token);  // and provide auto login for user
    };


    componentDidMount() {
        this.tryAutoAuthentication();
    }

    render() {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }
};


// Get Required Action(s) from central store
const mapDispatchToProps = dispatch => ({
    onAutoLogin: (userId, token) => dispatch(authSuccess(userId, token))
});

export default connect(null, mapDispatchToProps)(StartupScreen);