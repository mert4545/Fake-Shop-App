import React, { Component } from 'react';
import { ScrollView, Platform, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../../shared/components/CustomHeaderButton/CustomHeaderButton';
import Card from '../../../shared/components/UI/Card/Card';
import Text from '../../../shared/components/UI/Text/Text';
import Button from '../../../shared/components/UI/Button/Button';

import { deleteFromCart, clearCart } from '../../../store/actions/cartActions';
import { addOrder } from '../../../store/actions/orderActions';

import { styles } from './styles';


class CartScreen extends Component {
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
    });

    deleteCartItemHandler = (allProducts, productId, userId) => {
        this.props.onDeleteFromCart(allProducts, productId, userId);
    }

    orderWarningHandler = (userId, products) => {
        Alert.alert('', 'Are you sure you want to order these products?', [
            {
                text: 'CANCEL'
            },
            {
                text: 'OK',
                onPress: this.addToOrdersHandler.bind(this, userId, products)
            }
        ]);
    }

    addToOrdersHandler = (userId, products) => {
        const { onClearCart, onAddOrders } = this.props;
        onClearCart(userId);
        onAddOrders(products);
    }

    render() {
        const { button, card, text, iconContainer } = styles;
        const { cart, allProducts } = this.props;

        return (
            <ScrollView>
                <Card style={card}>
                    <Text style={text}>Total: ${cart.items.totalPrice.toFixed(2)}</Text>
                    <Button
                        style={button}
                        disabled={!cart || cart.items.products.length === 0 ? true : false}
                        label="Order Now"
                        onClick={this.orderWarningHandler.bind(this, cart.userId, cart.items.products)}
                    />
                </Card>
                {
                    cart.items.products.map(cartItem => (
                        <Card key={Math.random()} style={card}>
                            <Text style={text}>{`${cartItem.quantity} x ${cartItem.product.title}`}</Text>
                            <View style={iconContainer}>
                                <Ionicons
                                    name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                                    size={24} color={Platform.OS === "android" ? "black" : ""}
                                    onPress={this.deleteCartItemHandler.bind(this, allProducts, cartItem.product.id, cart.userId)}
                                />
                            </View>
                        </Card>
                    ))
                }
            </ScrollView>
        );
    }
}


const mapStateToProps = state => ({
    allProducts: state.rootProducts.allProducts,
    cart: state.rootCart.cart,
    orders: state.rootOrders.orders
});

const mapDispatchToProps = dispatch => ({
    onDeleteFromCart: (allProducts, productId, userId) => dispatch(deleteFromCart(allProducts, productId, userId)),
    onClearCart: userId => dispatch(clearCart(userId)),
    onAddOrders: newOrders => dispatch(addOrder(newOrders))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);