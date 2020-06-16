import { AsyncStorage } from 'react-native';
import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS, LOGOUT } from './actionTypes';
import { removeUnderscores } from '../../shared/utility';

// ========================== DEFINE ACTION CREATORS ==========================
const authStart = () => ({
    type: AUTH_START
});

const authFail = errMessage => ({
    type: AUTH_FAIL,
    errMessage
});


// ========================== DEFINE SYNCHRONOUS ACTIONS ==========================
const saveAuthData = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId,
        expirationDate: expirationDate.toISOString()
    }));
};

export const authSuccess = (userId, token) => ({
    type: AUTH_SUCCESS,
    userId,
    token
});

export const logout = () => ({
    type: LOGOUT
});


// ========================== DEFINE ASYNCHRONOUS ACTIONS ==========================
export const authenticate = (authType, userEmail, userPassword) => {
    return async dispatch => {
        dispatch(authStart());

        const requestData = {
            email: userEmail,
            password: userPassword,
            returnSecureToken: true
        };

        const configOpts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        };

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDFwEdjy2_cifZ3sQUVsjTRo09MW-4wGg";
        if (authType === 'login') {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDFwEdjy2_cifZ3sQUVsjTRo09MW-4wGg";
        }

        try {
            const response = await fetch(url, configOpts);
            const data = await response.json();

            const { expiresIn, idToken, localId } = data;


            if (data.error && data.error.code === 400) {
                throw new Error(data.error.message);
            }

            dispatch(authSuccess(localId, idToken));
            const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000));
            saveAuthData(idToken, localId, expirationDate);
        } catch (err) {
            const errMsg = removeUnderscores(err.message);
            dispatch(authFail(errMsg));
        }
    }
};
