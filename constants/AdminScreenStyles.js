import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import {
    Platform,
  } from "react-native";
  
const isAndroid = Platform.OS == "android";
const viewPadding = 10;

export default {
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    header : {
        alignItems: 'center',
        width: '100%',
        flex : 1,
        flexDirection : 'column',
        alignItems : 'center',
        paddingTop : '10%',
    },
    itemListContainer : {
        flex : 1,
        width : '100%',
        flexDirection : 'column',
        justifyContent: 'flex-start',
    },
    flexContainer: {
      backgroundColor: Colors.cloud,
      paddingTop : 20,
      flex : 1,
    },
    headerText : {
        ...Fonts.style.h1,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 0,
        textAlign : 'center'
    },
    searchBarContainer : {
        alignItems: 'center',
        width: '100%',
        height: 50,
        flexGrow : 1,
    },
    inputCaption : {
        ...Fonts.style.normal,
        paddingVertical: Metrics.baseMargin,
        color: 'white',
        marginVertical: Metrics.smallMargin,
        textAlign: 'center'
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
    button : {
      backgroundColor : Colors.cloud,
      borderColor : 'white',
      padding : 10,
      alignItems : 'center',
    },
    button2 : {
      backgroundColor : Colors.windowTint,
      borderColor : 'white',
      padding : 10,
      alignItems : 'center',
    },
    button3 : {
      backgroundColor : Colors.cloud,
      borderColor : 'white',
      padding : 10,
      alignItems : 'center',
      width : '95%'
    },
    logoutButton : {
      backgroundColor : Colors.logout,
      borderColor : 'white',
      padding : 10,
      alignItems : 'center',
    },
    cardContent : {
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems : 'center'
    },
    cardTitle : {
        ...Fonts.style.h5,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 0,
    },
    cardAction : {
        ...Fonts.style.h5,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 0,
    },
    cardActionNotDelete : {
        ...Fonts.style.h5,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 0,
    },
    cardActions : {
        ...Fonts.style.regular,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 0,
    },
    cardSubtitle : {
        ...Fonts.style.regular,
        color: 'black',
        marginVertical: 0,
    },
    itemListContainer : {
        alignItems: 'center',
        height: 50,
        flex : 1,
        width : '100%',
        flexDirection : 'column',
        justifyContent: 'flex-start',
        alignItems : 'stretch'
    },
    resultContainer : {
        alignItems: 'center',
        width : '100%',
        flexDirection : 'column',
        justifyContent: 'flex-start',
        paddingHorizontal : 10,
    },
    resultText : {
        ...Fonts.style.h3,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 0,
        textAlign : 'center'
    },
    cardButton : {
      backgroundColor : Colors.cloud,
      borderColor : 'white',
      padding : 10,
      alignItems : 'center',
    },
}