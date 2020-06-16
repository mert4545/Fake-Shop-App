import { StyleSheet } from 'react-native';

import { Colors } from '../../../shared/utility';

export const styles = StyleSheet.create({
    card: {
        height: 100,
        //flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 15
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: '100%'
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