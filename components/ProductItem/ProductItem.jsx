import React from 'react';
import { View, Image } from 'react-native';

import Button from '../../shared/components/UI/Button/Button';
import Card from '../../shared/components/UI/Card/Card';
import Text from '../../shared/components/UI/Text/Text';

import { styles } from './styles';

const ProductItem = props => {
    const { description, imageUrl, price, title, onAddProduct } = props;
    const { card, imageContainer, image, detailContainer, buttonContainer, text } = styles;

    return <Card style={card}>
        <View style={imageContainer}>
            <Image source={{ uri: imageUrl }} style={image} />
        </View>
        <View style={detailContainer}>
            <Text style={{ ...text, fontFamily: 'open-sans-bold' }}>{title}</Text>
            <Text style={text}>{description}</Text>
            <Text style={text}>${price.toFixed(2)}</Text>
        </View>
        <View style={buttonContainer}>
            <Button label="Add to Cart" onClick={onAddProduct} />
        </View>
    </Card>
};

export default ProductItem;