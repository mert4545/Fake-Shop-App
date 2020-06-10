import React from 'react';
import { View, TextInput, Alert } from 'react-native';

import Text from '../Text/Text';

import { styles } from './styles';

const FormInput = props => {
    const { errorTextHeader, errorText, isValid, label, onChangeInput, onBlurInput, onFocusInput, touched, maxLength, keyboardType, returnKeyType } = props;
    const { textContainer, text, inputText } = styles;

    return (
        <View style={textContainer}>
            <Text style={text}>{label}</Text>
            <TextInput
                style={inputText}
                onChangeText={onChangeInput}
                onBlur={onBlurInput}
                onFocus={onFocusInput}
                maxLength={maxLength && maxLength}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
            />
            {touched && !isValid && Alert.alert(errorTextHeader, errorText, [{ text: 'OK' }])}
        </View>
    );
};

export default FormInput;