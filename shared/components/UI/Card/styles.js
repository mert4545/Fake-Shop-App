import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    cardContainer: {
        width: '90%',
        marginVertical: 10,
        shadowColor: '#ccc',
        shadowOffset: {
            width: 12,
            height: 8
        },
        shadowOpacity: 0.45,
        shadowRadius: 3,
        elevation: 8,
        backgroundColor: '#ecfdfb',
        //justifyContent: 'space-between',
        alignItems: 'center'
    }
})