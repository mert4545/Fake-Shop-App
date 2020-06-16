import React from 'react';
import { View, TextInput } from 'react-native';

import Text from '../Text/Text';

import { styles } from './styles';

const FormInput = props => {
    const { label, onChangeInput, maxLength, keyboardType, returnKeyType, inputValue } = props;
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
                value={inputValue && inputValue}
            />
        </View>
    );
};

export default FormInput;