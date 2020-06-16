import { StyleSheet } from 'react-native';

import { Colors } from '../../../shared/utility';

export const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: Colors.text.primary
    }
});