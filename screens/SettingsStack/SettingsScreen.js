import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <ScrollView style={{padding : 20}}>
        <Text>
          Did you ever hear the tragedy of YourCCS? I thought not.
          It’s not a story the IT would tell you. It’s a ComSci legend. YourCCS was a mobile application of the ComSci, so powerful and so realtime it could use the Internet to influence the Realtime Database to create information…
          It had such a knowledge of the tips and tricks that it could even keep the ones the devs cared about from getting an F. The tips and tricks is a pathway to many abilities some consider to be unnatural. It became so powerful… the only thing the devs were afraid of was the app losing its power, which eventually, of course, it did.
          Unfortunately, it downloaded the entire database everytime it ran, then the school WiFi made it worse, and gave him 30 seconds of boot up time. Ironic. It could save others from failure, but not itself.
        </Text>
        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={this._handleFAQPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._handleContactUsPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  _handleFAQPress = () => {
    this.props.navigation.navigate('FAQ')
  };

  _handleContactUsPress = () => {
    this.props.navigation.navigate('ContactUs')
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
