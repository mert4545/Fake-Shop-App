import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Image, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Button from '../../../shared/components/UI/Button/Button';
import Card from '../../../shared/components/UI/Card/Card';
import HeaderButton from '../../../shared/components/CustomHeaderButton/CustomHeaderButton';
import Text from '../../../shared/components/UI/Text/Text';

import { styles } from './styles';

import { fetchProducts } from '../../../store/actions/productActions';
import { addToCart } from '../../../store/actions/cartActions';

class ProductsOverviewScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: () => (  // place star icon to the right of the header
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Side Drawer Menu"
                    iconName={Platform.OS === "android" ? 'md-menu' : 'ios-menu'}
                    onPress={() => navigation.toggleDrawer()}
                    color="#fff"
                />
            </HeaderButtons>
        )
    })

    componentDidMount() {
        this.props.onFetchAllProducts();
    }

    navigateToProductDetailHandler = id => {
        this.props.navigation.navigate({
            routeName: 'ProductDetails',
            params: {
                productId: id
            }
        })
    }

    addProductToCartHandler = (prodId, userId) => {
        this.props.onAddToCart(prodId, userId);
    }

    renderProductItem = ({ item }) => {
        const { card, imageContainer, image, detailContainer, buttonContainer, text } = styles;

        return (
            <Card style={card}>
                <View style={imageContainer}>
                    <Image source={{ uri: item.imageUrl }} style={image} />
                </View>
                <View style={detailContainer}>
                    <Text style={text}>{item.title}</Text>
                </View>
                <View style={buttonContainer}>
                    <Button label="View Details" onClick={this.navigateToProductDetailHandler.bind(this, item.id)} />
                    <Button label="Add to Cart" onClick={this.addProductToCartHandler.bind(this, item.id, item.userId)} />
                </View>
            </Card>
        );
    }

    render() {
        return this.props.allProducts && <FlatList
            data={this.props.allProducts}
            renderItem={this.renderProductItem}
        />;
    }
}


const mapStateToProps = state => ({
    allProducts: state.rootProducts.allProducts
});

const mapDispatchToProps = dispatch => ({
    onFetchAllProducts: () => dispatch(fetchProducts()),
    onAddToCart: (productId, userId) => dispatch(addToCart(productId, userId))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductsOverviewScreen);