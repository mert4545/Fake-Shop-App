import React from 'react';
import { useDispatch } from 'react-redux';
import { Platform, SafeAreaView, View, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import AuthenticateScreen from '../screens/user/AuthenticateScreen/AuthenticateScreen';
import CartScreen from '../screens/shop/CartScreen/CartScreen';
import AddProductScreen from '../screens/shop/AddProductScreen/AddProductScreen';
import OrdersScreen from '../screens/shop/OrdersScreen/OrdersScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen/ProductDetailsScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen/ProductsOverviewScreen';
import StartupScreen from '../screens/StartupScreen/StartupScreen';

import { logout } from '../store/actions/authActions';

import { Colors } from '../shared/utility';

// ========================== UTILITY VARIABLE DECLARATIONS & DEFINITIONS ==========================

const defaultNavOpts = {  // default navigation options for all screens are stated here
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.text.secondary  // Platform specific background color
        },
        headerTintColor: Platform.OS === 'android' ? Colors.text.secondary : Colors.primary  // Platform specific header tint color
    }
};

const androidTabNavigatorOptions = {  // common options for each tab are stated here
    defaultNavigationOptions: ({ navigation }) => {
        return {
            shifting: true,
            labeled: true,
            activeColor: Colors.accent,
            inactiveColor: Colors.text.secondary,
            initialRouteName: 'Products',
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === "Products") {
                    iconName = 'ios-list';
                } else if (routeName === "Cart") {
                    iconName = Platform.OS === "android" ? "md-cart" : "ios-cart";
                }
                return <Ionicons name={iconName} size={30} color={tintColor} />
            }
        }
    },
    barStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : Colors.text.secondary
    }
};

const drawerNavigatorOptions = {  // shared drawer options are stated here
    drawerPosition: 'left',
    drawerWidth: 200,
    unmountInactiveRoutes: true,
    contentOptions: {
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.text.primary,
        labelStyle: {
            fontFamily: 'open-sans-bold',
            fontSize: 14
        }
    },
    contentComponent: props => {
        const dispatch = useDispatch();

        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems {...props} />
                    <Button
                        title="Logout"
                        color={Colors.primary}
                        onPress={() => {
                            dispatch(logout());
                            props.navigation.navigate('Authentication');
                        }}
                    />
                </SafeAreaView>
            </View>
        );
    }
};


// ========================== STACK NAVIGATORS DECLARATION ==========================

const ProductsStackNavigator = createStackNavigator({
    ProductsOverview: {
        screen: ProductsOverviewScreen,
        navigationOptions: {
            headerTitle: 'All Products'
        }
    },
    ProductDetails: {
        screen: ProductDetailsScreen,
        navigationOptions: {
            headerTitle: 'Details'
        }
    }
}, defaultNavOpts);

const OrdersStackNavigator = createStackNavigator({
    Orders: {
        screen: OrdersScreen,
        navigationOptions: {
            headerTitle: 'Your Orders'
        }
    }
}, defaultNavOpts);

const CartStackNavigator = createStackNavigator({
    Cart: {
        screen: CartScreen,
        navigationOptions: {
            headerTitle: 'Your Cart'
        }
    }
}, defaultNavOpts);

const AddProductStackNavigator = createStackNavigator({
    AddProduct: {
        screen: AddProductScreen,
        navigationOptions: {
            headerTitle: 'Add'
        }
    }
}, defaultNavOpts);

const AuthenticateStackNavigator = createStackNavigator({
    Authenticate: {
        screen: AuthenticateScreen,
        navigationOptions: {
            headerTitle: 'Authenticate'
        }
    }
}, defaultNavOpts);


// ========================== TAB NAVIGATORS DECLARATION ==========================

const tabRoutesConfig = {
    Products: ProductsStackNavigator,
    Cart: CartStackNavigator
};

const ProductsTabNavigator = createMaterialBottomTabNavigator(tabRoutesConfig, androidTabNavigatorOptions);

// ========================== DRAWER NAVIGATORS DECLARATION ==========================

const ShopNavigator = createDrawerNavigator({
    ProductsStack: {
        screen: ProductsTabNavigator,
        navigationOptions: {
            drawerLabel: 'View Products',
            drawerIcon: ({ tintColor }) => <Ionicons name="ios-list" size={24} color={tintColor} />
        }
    },
    OrdersStack: {
        screen: OrdersStackNavigator,
        navigationOptions: {
            drawerLabel: 'View Orders',
            drawerIcon: ({ tintColor }) => <Ionicons name="ios-cart" size={24} color={tintColor} />
        }
    },
    AddProductStack: {
        screen: AddProductStackNavigator,
        navigationOptions: {
            drawerLabel: 'Add Product',
            drawerIcon: ({ tintColor }) => <MaterialIcons name="playlist-add" size={24} color={tintColor} />
        }
    }
}, drawerNavigatorOptions);


const MainNavigator = createSwitchNavigator({
    /* Startup: StartupScreen,
    Authentication: AuthenticateStackNavigator, */
    Shop: ShopNavigator
}, defaultNavOpts);


export default createAppContainer(MainNavigator);