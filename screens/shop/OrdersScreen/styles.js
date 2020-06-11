import { StyleSheet } from 'react-native';

import { Colors } from '../../../shared/utility';

export const styles = StyleSheet.create({
    card: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        paddingHorizontal: 15
    },
    text: {
        color: Colors.text.primary
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})