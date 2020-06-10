import { StyleSheet, Platform } from 'react-native';

import { Colors } from '../../../utility';

export const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans',
        fontSize: 18,
        color: Platform.OS === "android" ? Colors.text.secondary : Colors.primary,
        textAlign: 'center'
    }
});