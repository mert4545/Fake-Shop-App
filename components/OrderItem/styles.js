import { StyleSheet } from 'react-native';

import { Colors } from '../../shared/utility';

export const styles = StyleSheet.create({
    card: {
        width: '95%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 15,
        marginVertical: 20,
        backgroundColor: '#C5F3F5'
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: '100%'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
        width: '100%',
        paddingHorizontal: 5
    },
    headerText: {
        color: Colors.text.primary,
        fontFamily: 'open-sans-bold'
    },
    text: {
        color: Colors.text.primary
    },
    detailTextContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 25,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});