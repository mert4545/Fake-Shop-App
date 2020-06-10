import { StyleSheet } from 'react-native';

import { Colors } from '../../../utility';

export const styles = StyleSheet.create({
    textContainer: {
        justifyContent: 'space-between',
        paddingLeft: 20,
        alignItems: 'flex-start',
        height: 28,
        width: '100%'
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
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