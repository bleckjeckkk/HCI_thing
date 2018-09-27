import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import {
    Platform,
  } from "react-native";
  
const isAndroid = Platform.OS == "android";
const viewPadding = 10;

const LoginStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.background,
      paddingHorizontal : 10,
    },
    logo: {
        width: 300,
        resizeMode: 'contain'
    },
    textInput: {
        height: 40,
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: "white",
        backgroundColor: "white",
        color: 'black',
        borderWidth: isAndroid ? 0 : 1,
        width: "80%"
    },
    errtextInput: {
        height: 40,
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: "red",
        backgroundColor: "white",
        color: 'black',
        borderWidth: isAndroid ? 0 : 1,
        width: "80%"
    },
    loginContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      },
    loginSquare: {
        backgroundColor: Colors.transparent,
        opacity: 0.80,
        height: 400,
        width: 300,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    loginHeader: {
        alignItems: 'center',
        width: '100%',
        height: 50,
    },
    loginButton: {
        marginTop: isAndroid ? 0 : 10,
        backgroundColor : Colors.windowTint,
        borderColor : 'white',
    },
    sectionTitleLogin: {
        ...Fonts.style.h1,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 0,
    },
    sectionLogin: {
        ...Fonts.style.normal,
        paddingVertical: Metrics.baseMargin,
        color: 'white',
        marginVertical: Metrics.smallMargin,
        textAlign: 'center'
    },
  },
}

export default LoginStyles