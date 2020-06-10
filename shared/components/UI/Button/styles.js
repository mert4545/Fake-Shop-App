import { StyleSheet, Platform } from 'react-native';

import { Colors } from '../../../utility';

export const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 120,
        borderWidth: 1,
        borderColor: Platform.OS === "android" ? Colors.text.secondary : Colors.primary,
        backgroundColor: Platform.OS === "android" ? Colors.primary : Colors.text.secondary,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: Platform.OS === "ios" ? Colors.accent : Colors.text.secondary
    }
});