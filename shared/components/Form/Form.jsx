import React from 'react';
import { Keyboard } from 'react-native';

import Card from '../UI/Card/Card';

import { styles } from './styles';

const dismissKeyboardHandler = () => Keyboard.dismiss();

const Form = props => {
    const { children } = props;
    const { container } = styles;

    return (
        <Card style={container} onPress={dismissKeyboardHandler}>
            {children}
        </Card>
    );
}

export default Form;