import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';

import colors from '../../constants/Colors';

import { 
  Avatar,
  Text,
} from 'react-native-elements';

import styles from '../../constants/HomeScreenStyles';

export default class SettingsScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userID : -1,
    }
  }
  static navigationOptions = {
    title: 'About',
  };

  getUserID(){
    AsyncStorage.getItem('info')
    .then((value) => JSON.parse(value))
    .then((value) => this.setState({ userID : value.user.id }));
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={{...styles.container, padding : 10}}>
        <ScrollView>
          <View style={{ 
            flex : 1, 
            flexDirection : "row",
            justifyContent: 'flex-start',
            alignItems : 'center'
            }}>
            <View style={{ flex : 1}}>
              <Avatar
                large
                rounded
                source={require('../../assets/images/robot-prod.png')}
                activeOpacity={0.7}
              />
            </View>
            <View style={{ flex : 3 }}>
              <Text h2>
                About PCP
              </Text>
            </View>
          </View>
          <View style={styles.descContainer}>
            <Text>
              Did you ever hear the tragedy of YourCCS? I thought not.
            </Text>
            <Text>
              It’s not a story the IT would tell you. It’s a ComSci legend. YourCCS was a mobile application of the ComSci, so powerful and so realtime it could use the Internet to influence the Realtime Database to create information…
            </Text>
            <Text>
              It had such a knowledge of the tips and tricks that it could even keep the ones the devs cared about from getting an F. The tips and tricks is a pathway to many abilities some consider to be unnatural. It became so powerful… the only thing the devs were afraid of was the app losing its power, which eventually, of course, it did.
            </Text>
            <Text>
              Unfortunately, it downloaded the entire database everytime it ran, then the school WiFi made it worse, and gave him 30 seconds of boot up time. Ironic. It could save others from failure, but not itself.
            </Text>
          </View>
          <View style={styles.helpContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this._handleFavPress}
              >
              <Text style={styles.btnText}> Favorite Items </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={this._handleFAQPress}
              >
              <Text style={styles.btnText}> FAQ </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={this._handleContactUsPress}
            >
              <Text style={styles.btnText}> Contact Us </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={this._handleLogoutPress}
            >
              <Text style={styles.logoutBtnText}> Log Out </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
  _handleFavPress = () => {
    this.props.navigation.navigate('Fav',{ id : this.state.userID })
  };

  _handleFAQPress = () => {
    this.props.navigation.navigate('FAQ')
  };

  _handleContactUsPress = () => {
    this.props.navigation.navigate('ContactUs',{ id : this.state.userID })
  };

  _handleLogoutPress = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };
}
