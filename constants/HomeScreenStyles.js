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
      alignItems : 'center'
    },
    header : {
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
    faq_headerText : {
        ...Fonts.style.h1,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 0,
        textAlign : 'center',
        borderBottomWidth : 2,
        borderBottomColor : Colors.windowTint,
    },
    smallerHeaderText : {
        ...Fonts.style.h3,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 0,
        textAlign : 'center'
    },
    subheaderText : {
        ...Fonts.style.h6,
        color: 'white',
        marginVertical: 0,
        textAlign : 'center'
    },
    faq_subheaderText : {
        ...Fonts.style.h6,
        color: 'white',
        marginVertical: 10,
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
      marginTop : 5,
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
        color: 'red',
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
    faqContainer : {
        marginTop : 10,
        padding : 10,
        alignItems: 'center',
        flex : 1,
        width : '100%',
        flexDirection : 'column',
        justifyContent: 'flex-start',
        alignItems : 'stretch',
        borderBottomWidth : 1,
        borderBottomColor : Colors.windowTint,
    },
    descContainer:{
        marginTop : 5,
        padding : 5
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
    feedbackContainer : {
        flex : 4,
        marginTop : 10,
        alignItems: 'center',
        width: '100%',
        flexDirection : 'column',
    },
    socialMediaContainer : {
        flex : 2,
        marginTop : 10,
        alignItems: 'center',
        width: '100%',
        flexDirection : 'column',
    },
    textBox: {
        height: '30%',
        minHeight : '30%',
        maxHeight : '30%',
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: "white",
        backgroundColor: "white",
        color: 'black',
        borderWidth: isAndroid ? 0 : 1,
        width: "80%",
        minWidth : '80%',
        ...Fonts.style.regular,
    },
    textBoxErr: {
        height: '30%',
        minHeight : '30%',
        maxHeight : '30%',
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: "red",
        backgroundColor: "white",
        color: 'black',
        borderWidth: isAndroid ? 0 : 1,
        width: "80%",
        minWidth : '80%',
        ...Fonts.style.regular,
    },
    lengthText: {
        ...Fonts.style.medium,
        color: 'white',
        marginVertical: 0,
        textAlign : 'right'
    },
    lengthTextErr: {
        ...Fonts.style.medium,
        color: 'red',
        marginVertical: 0,
        textAlign : 'right'
    },
    logoutButton : {
        marginTop: 15,
        backgroundColor : Colors.desButtonColor,
        padding : 10,
        alignItems : 'center',
    },
    btnText : {
        ...Fonts.style.h5,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 0,
    },
    logoutBtnText : {
        ...Fonts.style.h5,
        fontWeight: 'bold',
        color: 'red',
        marginVertical: 0,
    },
    helpContainer : {
        marginTop : 5,
        alignItems: 'center',
        flex : 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    }
}