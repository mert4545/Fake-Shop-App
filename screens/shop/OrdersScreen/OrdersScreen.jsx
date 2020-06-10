import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Card from '../../../shared/components/UI/Card/Card';
import HeaderButton from '../../../shared/components/CustomHeaderButton/CustomHeaderButton';
import Text from '../../../shared/components/UI/Text/Text';

import { styles } from './styles';

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
        const { card, text } = styles;

        return (
            <Card style={card}>
                <Text style={text}>{`${item.quantity} x ${item.product.title}`}</Text>
            </Card>
        );
    }

    render() {
        return (
            <FlatList
                keyExtractor={item => item.product.id}
                data={this.props.orders}
                renderItem={this.renderOrderProductsHandler}
            />
        );
    }
}


const mapStateToProps = state => ({
    orders: state.rootOrders.orders
});

export default connect(mapStateToProps)(OrdersScreen);