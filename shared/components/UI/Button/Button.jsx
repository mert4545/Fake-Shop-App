import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Text from '../Text/Text';

import { styles } from './styles';

const Button = props => {
    const { disabled, label, onClick, style } = props;
    const { container, text } = styles;

    return (
        <TouchableOpacity disabled={disabled} activeOpacity={0.45} onPress={onClick}>
            <View style={{ ...container, ...style }}>
                <Text style={text}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default Button;