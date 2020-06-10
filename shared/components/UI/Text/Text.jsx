import React from 'react';
import { Text } from 'react-native';

import { styles } from './styles';

const CustomText = props => {
    const { children, style } = props;
    const { text } = styles;

    return <Text style={{ ...text, ...style }}>{children}</Text>;
};

export default CustomText;