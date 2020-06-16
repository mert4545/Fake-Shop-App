import React, { Component, Fragment } from 'react';
import { FlatList, ActivityIndicator, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Button from '../../../shared/components/UI/Button/Button';
import Card from '../../../shared/components/UI/Card/Card';
import HeaderButton from '../../../shared/components/CustomHeaderButton/CustomHeaderButton';
import Text from '../../../shared/components/UI/Text/Text';
import OrderItem from '../../../components/OrderItem/OrderItem';

import { styles } from './styles';
import { Colors } from '../../../shared/utility';

import { fetchOrders } from '../../../store/actions/orderActions';

class OrdersScreen extends Component {
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

    renderOrderProductsHandler = ({ item }) => {
        return <OrderItem
            title={item.product.title}
            quantity={item.quantity}
            price={item.product.price}
            orderDate={item.orderDate}
        />;
    }

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        const { orders, loading, onFetchOrders, error } = this.props;

        if (error)
            return <View style={styles.loading}>
                <Text style={styles.text}>Error while loading orders; possibly a network error.</Text>
                <Button label="PLEASE TRY AGAIN" onClick={onFetchOrders} />
            </View>;

        if (loading)
            return <View style={styles.loading}>
                <ActivityIndicator color={Colors.text.primary} size="large" />
            </View>;

        if (!orders || orders.length === 0) {
            return <View style={styles.loading}>
                <Text style={styles.text}>No orders available</Text>
            </View>;
        }

        return <FlatList
            keyExtractor={item => item.product.id.toString() + Math.random().toString() * Math.random().toString()}
            onRefresh={onFetchOrders}  // RefreshControl for "Pull to Refresh" functionality. If "Pull to Refresh" action is taken, products will be reloaded.
            refreshing={loading}        // required property for "onRefresh"
            data={orders}
            renderItem={this.renderOrderProductsHandler}
        />;
    }
}


const mapStateToProps = state => ({
    orders: state.rootOrders.orders,
    loading: state.rootOrders.loading,
    error: state.rootOrders.error
});

const mapDispatchToProps = dispatch => ({
    onFetchOrders: () => dispatch(fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);