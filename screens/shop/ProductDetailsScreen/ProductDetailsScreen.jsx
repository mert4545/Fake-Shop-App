import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../../shared/components/CustomHeaderButton/CustomHeaderButton';

import ProductItem from '../../../components/ProductItem/ProductItem';

import { addToCart } from '../../../store/actions/cartActions';

import { styles } from './styles';

class ProductDetailsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: () => (  // place cart icon to the right of the header
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add to Cart"
                    iconName={Platform.OS === "android" ? 'md-cart' : 'ios-cart'}
                    onPress={() => navigation.navigate('Cart')}  // upon pressing cart icon, navigate to 'Cart' screen
                />
            </HeaderButtons>
        )
    });

    addProductToCartHandler = (allProducts, prodId, userId) => {
        this.props.onAddToCart(allProducts, prodId, userId);
    }

    render() {
        const { allProducts, navigation } = this.props;
        const displayedProduct = allProducts.find(prod => prod.id === navigation.getParam('productId'));

        if (!displayedProduct)  // if an error occurs
            return <View style={styles.loading}>
                <Text style={styles.text}>Error while loading orders; possibly a network error. Please try again later.</Text>
            </View>;

        return <ProductItem  // in case no error, render Product Detail(s)
            title={displayedProduct.title}
            description={displayedProduct.description}
            imageUrl={displayedProduct.imageUrl}
            price={displayedProduct.price}
            onAddProduct={() => this.addProductToCartHandler(allProducts, displayedProduct.id, displayedProduct.userId)}
        />;
    }
}


// Get Required State(s) from central store
const mapStateToProps = state => ({
    allProducts: state.rootProducts.allProducts
});

// Get Required Action(s) from central store
const mapDispatchToProps = dispatch => ({
    onAddToCart: (allProducts, productId, userId) => dispatch(addToCart(allProducts, productId, userId))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsScreen);