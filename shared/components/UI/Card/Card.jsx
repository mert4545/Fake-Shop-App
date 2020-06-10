import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import { styles } from './styles';

const Card = props => {
    const { cardContainer, container } = styles;
    const { children, style, onPress } = props;

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={container}>
                <View style={{ ...cardContainer, ...style }}>
                    {children}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default Card;