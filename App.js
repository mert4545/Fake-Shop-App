import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AppLoading } from 'expo';

import AppNavigator from './navigation/AppNavigator';

import { enableScreens } from 'react-native-screens';
import { fetchFonts } from './shared/utility';

import { cartReducer } from './store/reducers/cartReducer';
import { productsReducer } from './store/reducers/productReducer';
import { ordersReducer } from './store/reducers/orderReducer';

enableScreens();

const rootReducer = combineReducers({
  rootProducts: productsReducer,
  rootCart: cartReducer,
  rootOrders: ordersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  state = {
    fontsLoaded: false
  }

  loadFontsHandler = () => this.setState({ fontsLoaded: true });

  render() {
    if (!this.state.fontsLoaded) return <AppLoading startAsync={fetchFonts} onFinish={this.loadFontsHandler} />
    return <Provider store={store}><AppNavigator /></Provider>;
  }
}

export default App;