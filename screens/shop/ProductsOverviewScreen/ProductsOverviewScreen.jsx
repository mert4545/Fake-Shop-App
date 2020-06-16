import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Image, Platform, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Button from '../../../shared/components/UI/Button/Button';
import Card from '../../../shared/components/UI/Card/Card';
import HeaderButton from '../../../shared/components/CustomHeaderButton/CustomHeaderButton';
import Text from '../../../shared/components/UI/Text/Text';

import { styles } from './styles';
import { Colors } from '../../../shared/utility';

import { fetchProducts } from '../../../store/actions/productActions';
import { addToCart } from '../../../store/actions/cartActions';

class ProductsOverviewScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: () => (  // place menu icon to the left of the header
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

    componentDidMount() {  // fetch all products from database upon component mounting
        this.props.onFetchProducts();
    }

    navigateToProductDetailHandler = id => {  // used for button click event handler in Line-60
        this.props.navigation.navigate({
            routeName: 'ProductDetails',
            params: {
                productId: id
            }
        })
    }

    addProductToCartHandler = (allProducts, prodId, userId) => {
        this.props.onAddToCart(allProducts, prodId, userId);
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
                    <Button label="Add to Cart" onClick={this.addProductToCartHandler.bind(this, this.props.allProducts, item.id, item.userId)} />
                </View>
            </Card>
        );
    }

    render() {
        const { allProducts, loading, onFetchProducts, error } = this.props;

        if (error)  // render upon error occuring
            return <View style={styles.loading}>
                <Text style={styles.text}>Error while loading products</Text>
                <Button label="TRY AGAIN" onClick={onFetchProducts} />
            </View>;

        let content = (  // set default value of "content" variable to show a loading spinner while fetching products from database
            <View style={styles.loading}>
                <ActivityIndicator color={Colors.text.primary} size="large" />
            </View>
        );

        if (!loading && (!allProducts || allProducts.length === 0)) {  // no products fetched from database
            content = (
                <View style={styles.loading}>
                    <Text style={styles.text}>No products available</Text>
                </View>
            );
        } else if (!loading) {  // upon successfully fetching products from database
            content = allProducts && <FlatList
                keyExtractor={item => item.id.toString()}
                onRefresh={onFetchProducts}  // RefreshControl for "Pull to Refresh" functionality. If "Pull to Refresh" action is taken, products will be reloaded.
                refreshing={loading}        // required property for "onRefresh"
                data={allProducts}
                renderItem={this.renderProductItem}
            />;
        }
        return content;
    }
}


// Get Required State(s) from central store
const mapStateToProps = state => ({
    allProducts: state.rootProducts.allProducts,
    error: state.rootProducts.error,
    loading: state.rootProducts.loading
});

// Get Required Action(s) from central store
const mapDispatchToProps = dispatch => ({
    onFetchProducts: () => dispatch(fetchProducts()),
    onAddToCart: (allProducts, productId, userId) => dispatch(addToCart(allProducts, productId, userId))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductsOverviewScreen);