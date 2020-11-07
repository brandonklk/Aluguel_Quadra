import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight + 20,
        width: '100%',
    },
    inputDefault: {
        width: '100%',
        padding: 8,
        borderRadius: 7,
        marginBottom: 15,
        fontSize: 17,
        backgroundColor: '#DCDCDC',
    },
    buttonDefault: {
        width: '100%',
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#99E599',
        borderRadius: 7,
    },
    textButton: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
    msgError: {
        color: 'red',
        marginTop: -15,
        marginBottom: 15,
        marginLeft: 15,
        width: '100%', 
        borderColor: 'red'
    }
});