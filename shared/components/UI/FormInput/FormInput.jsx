import React from 'react';
import { View, TextInput, Alert } from 'react-native';

import Text from '../Text/Text';

import { styles } from './styles';

const FormInput = props => {
    const { label, onChangeInput, maxLength, keyboardType, returnKeyType } = props;
    const { textContainer, text, inputText } = styles;

    return (
        <View style={textContainer}>
            <Text style={text}>{label}</Text>
            <TextInput
                style={inputText}
                onChangeText={onChangeInput}
                maxLength={maxLength && maxLength}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
            />
        </View>
    );
};

export default FormInput;