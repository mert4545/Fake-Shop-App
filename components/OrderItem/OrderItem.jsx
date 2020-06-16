import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import moment from 'moment';

import Button from '../../shared/components/UI/Button/Button';
import Card from '../../shared/components/UI/Card/Card';
import Text from '../../shared/components/UI/Text/Text';

import { styles } from './styles';

const OrderItem = props => {
    const { title, quantity, price, orderDate } = props;
    const { btnContainer, card, headerText, text, textContainer, detailTextContainer } = styles;
    const [showDetails, setShowDetails] = useState(false);

    const toggleShowDetailsHandler = useCallback(() => {
        setShowDetails(prevState => !prevState);
    }, []);

    return (
        <Card style={{ ...card, height: showDetails ? 180 : 110 }}>
            <View style={textContainer}>
                <Text style={headerText}>{`$ ${quantity * price.toFixed(2)}`}</Text>
                <Text style={text}>{moment(orderDate).format('MMMM Do YYYY, hh:mm')}</Text>
            </View>
            <View style={btnContainer}>
                <Button label={`${showDetails ? 'Hide' : 'Show'} Details`} onClick={toggleShowDetailsHandler} />
            </View>

            {
                showDetails && <View style={detailTextContainer}>
                    <Text style={text}>{`${quantity} x ${title}`}</Text>
                    <Text style={headerText}>{quantity} x $ {price.toFixed(2)}</Text>
                </View>
            }
        </Card>
    );
};

export default OrderItem;