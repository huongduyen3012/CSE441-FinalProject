import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
    },

    header: {
        marginVertical: 36,
    },

    headerImg: {
        width: 90,
        height: 90,
        alignSelf: 'center',
    },

    title: {
        fontSize: 27,
        fontWeight: '700',
        color: '#1e1e1e',
        marginBottom: 6,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
        textAlign: 'center',
    },

    input: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },

    inputControl: {
        height: 44,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'grey',
        fontSize: 15,
        fontWeight: ' 500',
        color: '#222',
    },
    form: {
        marginBottom: 24,
        flex: 1,
    },

    formAction: {
        marginBottom: 5,

    },

    formFooter: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'grey',
        textAlign: 'center',
        letterSpacing: 0.15,
    },
    btn: {
        backgroundColor: '#075eec',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#075eec',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },

    link: {
        color: '#F50057',
        fontSize: 15,
        marginBottom: 15,
    },

    fp: {
        display: 'flex',
        alignItems: 'flex-end',
        marginHorizontal: 5,
        marginVertical: 5,
    },

    lineContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'gray',
    },

    bottomText: {
        fontSize: 17,
        textAlign: 'center',
        margin: 5,
    },

    containerSocialbutton: {
        marginHorizontal: 20,
    },

    socialButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },

    icon: {
        height: 60,
        width: 60,
    },

    //HomeScreen

});

export default styles;