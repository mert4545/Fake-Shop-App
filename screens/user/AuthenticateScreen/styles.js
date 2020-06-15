import { StyleSheet, Platform } from 'react-native';

import { Colors } from '../../../shared/utility';

export const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        width: 180,
        height: 45
    },
    switchBtn: {
        backgroundColor: Platform.OS === "android" ? Colors.accent : ''
    }
});