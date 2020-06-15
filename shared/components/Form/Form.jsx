import React from 'react';
import { Keyboard } from 'react-native';

import Card from '../UI/Card/Card';

import { styles } from './styles';

const dismissKeyboardHandler = () => Keyboard.dismiss();

const Form = props => {
    const { children, style } = props;
    const { container } = styles;

    return (
        <Card style={!style ? container : { ...container, ...style }} onPress={dismissKeyboardHandler}>
            {children}
        </Card>
    );
}

export default Form;