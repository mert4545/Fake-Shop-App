import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Button from '../../../shared/components/UI/Button/Button';
import Form from '../../../shared/components/Form/Form';
import FormInput from '../../../shared/components/UI/FormInput/FormInput';
import HeaderButton from '../../../shared/components/CustomHeaderButton/CustomHeaderButton';

import { checkInputValidity, addProductFormErrors } from '../../../shared/utility';

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
                isValid: false
            },
            imageUrl: {
                value: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstore.steelcase.com%2Fstorage%2Fbookcases-shelving%2Fcurrency-4-shelf-bookcase&psig=AOvVaw0mQ_e2NxOZl2xnhCn35PKT&ust=1591868271289000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiMssn59ukCFQAAAAAdAAAAABAD',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            price: {
                value: '',
                isValid: false
            },
        },
        formIsValid: false
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.setParams({ addProduct: this.addNewProductHandler });
    }

    addNewProductHandler = () => {
        const { navigation, onAddProduct, userId } = this.props;
        const { title, imageUrl, description, price } = this.state.formInputs;

        this.setState({
            formIsValid: title.isValid && imageUrl.isValid && description.isValid && price.isValid ? true : false
        }, () => {
            let errors;
            if (!this.state.formIsValid) {
                errors = addProductFormErrors.reduce((allErrors, currentError) => {
                    if (!this.state.formInputs[currentError.id].isValid) {
                        allErrors = [...allErrors, currentError.errorText];
                    }
                    return allErrors;
                }, []);

                const transformedErrorMessages = errors.reduce((errMessage, err, index) => {
                    errMessage += `${index + 1}. ${err}\n\n`
                    return errMessage;
                }, '');

                Alert.alert('Invalid Form Inputs', transformedErrorMessages, [{ text: 'OK' }]);
            } else {
                const product = new Product(Math.random().toString(), userId, title.value, imageUrl.value, description.value, +price.value);
                onAddProduct(product);
                navigation.navigate('ProductsOverview');
            }
        });
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
            }, () => {  // this callback is called after updating input field value in order to check its validity.
                this.setState({
                    formInputs: {
                        ...this.state.formInputs,
                        [id]: {
                            ...this.state.formInputs[id],
                            isValid: checkInputValidity(id, this.state.formInputs[id].value)
                        }
                    }
                })
            });
        }

        this.setState({
            formInputs: {
                ...this.state.formInputs,
                [id]: {
                    ...this.state.formInputs[id],
                    value: inputText
                }
            }
        }, () => {
            this.setState({
                formInputs: {
                    ...this.state.formInputs,
                    [id]: {
                        ...this.state.formInputs[id],
                        isValid: checkInputValidity(id, this.state.formInputs[id].value)
                    }
                }
            })
        });
    }

    render() {

        return (
            <Form>
                {
                    addProductFormErrors.map(err => (
                        <FormInput
                            key={err.errorText}
                            label={err.label}
                            errorTextHeader={err.errorTextHeader}
                            errorText={err.errorText}
                            isValid={this.state.formInputs[err.id].isValid}
                            onChangeInput={this.inputTextChangedHandler.bind(this, err.id)}
                            keyboardType={`${err.id === 'price' ? 'decimal-pad' : 'default'}`}
                            returnKeyType={`${err.id === 'price' ? 'done' : 'next'}`}
                        />
                    ))
                }
                <Button label='ADD' onClick={this.addNewProductHandler} />
            </Form>
        );
    }
}


const mapStateToProps = state => ({
    allProducts: state.rootProducts.allProducts,
    userId: state.rootAuth.userId
});

const mapDispatchToProps = dispatch => ({
    onAddProduct: product => dispatch(addProduct(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProductScreen);