import React, { useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';

import { authSuccess } from '../../store/actions/authActions';

import { Colors } from '../../shared/utility';
import { styles } from './styles';


class StartupScreen extends Component {

    tryAutoAuthentication = async () => {
        const { onAutoLogin, navigation } = this.props;


        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
            navigation.navigate('Auth');
            return;
        }
        const transformedUserData = JSON.parse(userData);
        const { token, userId, expirationDate } = transformedUserData;

        const expDate = new Date(expirationDate);
        if (expDate <= new Date() || !token || !userId) {
            navigation.navigate('Auth');
            return;
        }

        navigation.navigate('Shop');
        onAutoLogin(userId, token);
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


const mapDispatchToProps = dispatch => ({
    onAutoLogin: (userId, token) => dispatch(authSuccess(userId, token))
});

export default connect(null, mapDispatchToProps)(StartupScreen);