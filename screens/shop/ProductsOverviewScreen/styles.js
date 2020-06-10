import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    card: {
        width: '90%',
        height: 350
    },
    imageContainer: {
        width: '100%',
        height: '55%',
    },
    detailContainer: {
        width: '100%',
        height: '25%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    text: {
        color: '#000',
        fontFamily: 'open-sans-bold',
        fontSize: 22
    }
});