import { StyleSheet } from 'react-native';

import { Colors } from '../../utility';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        elevation: 0
    },
    textContainer: {
        justifyContent: 'space-between',
        paddingLeft: 20,
        alignItems: 'flex-start',
        height: 35,
        width: '100%'
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: Colors.text.primary
    },
    inputText: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary,
        width: '90%',
        fontSize: 18,
        fontFamily: 'open-sans'
    }
});