import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    card: {
        width: '90%',
        height: 400
    },
    imageContainer: {
        width: '100%',
        height: '55%',
    },
    detailContainer: {
        width: '90%',
        height: '33%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        height: '12%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    text: {
        color: '#000'
    }
})