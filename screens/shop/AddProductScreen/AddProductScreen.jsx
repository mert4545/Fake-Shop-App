import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Button from '../../../shared/components/UI/Button/Button';
import Form from '../../../shared/components/Form/Form';
import FormInput from '../../../shared/components/UI/FormInput/FormInput';
import HeaderButton from '../../../shared/components/CustomHeaderButton/CustomHeaderButton';

import { checkInputValidity } from '../../../shared/utility';

import { addProduct } from '../../../store/actions/productActions';
import Product from '../../../models/shop/product';

const styles = StyleSheet.create({
    checkmark: {
        marginRight: 20
    }
});

class AddProductScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: () => <Ionicons
            style={styles.checkmark}
            name={Platform.OS === "android" ? "md-checkmark-circle" : "ios-checkmark-circle"}
            size={28}
            color="white"
            onPress={navigation.getParam('addProduct')}
        />,
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

    state = {
        formInputs: {
            title: {
                value: '',
                isValid: false,
                touched: false
            },
            imageUrl: {
                value: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstore.steelcase.com%2Fstorage%2Fbookcases-shelving%2Fcurrency-4-shelf-bookcase&psig=AOvVaw0mQ_e2NxOZl2xnhCn35PKT&ust=1591868271289000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiMssn59ukCFQAAAAAdAAAAABAD',
                isValid: false,
                touched: false
            },
            description: {
                value: '',
                isValid: false,
                touched: false
            },
            price: {
                value: '',
                isValid: false,
                touched: false
            },
        },
        formIsValid: false
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.setParams({ addProduct: this.addNewProductHandler });
    }

    addNewProductHandler = () => {
        const { navigation, onAddProduct } = this.props;
        const { title, imageUrl, description, price } = this.state.formInputs;

        const product = new Product(Math.random().toString(), 'u1', title.value, imageUrl.value, description.value, +price.value);
        onAddProduct(product);
        navigation.navigate('ProductsOverview');
    }

    inputTextChangedHandler = (id, inputText) => {
        if (id === 'price') {
            return this.setState({
                formInputs: {
                    ...this.state.formInputs,
                    price: {
                        ...this.state.formInputs.price,
                        value: inputText.includes(',') ? inputText.replace(/,/g, '.') : inputText
                    }
                }
            });
        }

        return this.setState({
            formInputs: {
                ...this.state.formInputs,
                [id]: {
                    ...this.state.formInputs[id],
                    value: inputText
                }
            }
        });
    }

    inputLostFocusHandler = id => {
        this.setState({
            formInputs: {
                ...this.state.formInputs,
                [id]: {
                    ...this.state.formInputs[id],
                    isValid: checkInputValidity(id, this.state.formInputs[id].value),
                    touched: true
                }
            }
        });
    }

    inputFocusedHandler = id => {
        this.setState({
            formInputs: {
                ...this.state.formInputs,
                [id]: {
                    ...this.state.formInputs[id],
                    touched: false
                }
            }
        });
    }

    render() {

        return (
            <Form>
                <FormInput
                    label="Title"
                    errorTextHeader="Invalid Title"
                    errorText="Title can not be less than 6 characters."
                    touched={this.state.formInputs.title.touched}
                    isValid={this.state.formInputs.title.isValid}
                    onChangeInput={this.inputTextChangedHandler.bind(this, 'title')}
                    onBlurInput={this.inputLostFocusHandler.bind(this, 'title')}
                    onFocusInput={this.inputFocusedHandler.bind(this, 'title')}
                    keyboardType="default"
                    returnKeyType="next"
                />
                <FormInput
                    label="Image URL"
                    errorTextHeader="Invalid image URL"
                    errorText="Please provide a valid URL."
                    touched={this.state.formInputs.imageUrl.touched}
                    isValid={this.state.formInputs.imageUrl.isValid}
                    onChangeInput={this.inputTextChangedHandler.bind(this, 'imageUrl')}
                    onBlurInput={this.inputLostFocusHandler.bind(this, 'imageUrl')}
                    onFocusInput={this.inputFocusedHandler.bind(this, 'imageUrl')}
                    keyboardType="default"
                    returnKeyType="next"
                />
                <FormInput
                    label="Description"
                    errorTextHeader="Invalid Description"
                    errorText="Description field cannot be left blank."
                    touched={this.state.formInputs.description.touched}
                    isValid={this.state.formInputs.description.isValid}
                    onChangeInput={this.inputTextChangedHandler.bind(this, 'description')}
                    onBlurInput={this.inputLostFocusHandler.bind(this, 'description')}
                    onFocusInput={this.inputFocusedHandler.bind(this, 'description')}
                    keyboardType="default"
                    returnKeyType="next"
                />
                <FormInput
                    label="Price"
                    errorTextHeader="Invalid Price"
                    errorText="Price can not be negative."
                    touched={this.state.formInputs.price.touched}
                    isValid={this.state.formInputs.price.isValid}
                    onChangeInput={this.inputTextChangedHandler.bind(this, 'price')}
                    onBlurInput={this.inputLostFocusHandler.bind(this, 'price')}
                    onFocusInput={this.inputFocusedHandler.bind(this, 'price')}
                    keyboardType="decimal-pad"
                    returnKeyType="done"
                />
                <Button label='ADD' onClick={this.addNewProductHandler} />
            </Form>
        );
    }
}


const mapStateToProps = state => ({
    allProducts: state.rootProducts.allProducts
});

const mapDispatchToProps = dispatch => ({
    onAddProduct: product => dispatch(addProduct(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProductScreen);