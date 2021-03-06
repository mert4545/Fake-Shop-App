import { StyleSheet, Platform } from 'react-native';

import { Colors } from '../../../shared/utility';

export const styles = StyleSheet.create({
    card: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        paddingHorizontal: 15
    },
    button: {
        backgroundColor: Platform.OS === "android" ? Colors.accent : Colors.text.secondary
    },
    text: {
        color: Colors.text.primary
    },
    iconContainer: {
        flexDirection: 'row',
        width: '20%',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});