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

import styles from '../../constants/AdminScreenStyles';

export default class AdminHome extends React.Component {
  static navigationOptions = {
    title: 'Admin Panel',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
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
              <Text style={{...styles.headerText, textAlign : 'left'}}>
                Admin Panel
              </Text>
            </View>
          </View>
          <Text style={{color : 'white'}}>
            {poem}
          </Text>
          <View style={styles.helpContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.push('Messages')}
              >
              <Text style={styles.cardActionNotDelete}> View Messages </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={this._handleLogoutPress}
            >
              <Text style={styles.cardAction}> Log Out </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
  _handleLogoutPress = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };
}

const poem = `
  I walked under the rising sun
  Sea breeze - salty and fresh
  I walked blind, undone
  Blood oozing under my flesh

  I saw you - laying, unmoving
  Your eyes closed but fresh tears were flowing like a hidden waterfall
  Secretive, painful but full of beauty
  Tantalizing, fresh, but haunting

  To reach out, to touch - I walk blind, no more
  Too good at hiding, too good at subtle byes
  I watched you leaving the bright light of the sun and the salty, fresh breeze
  You were leaving and I was watching
  How did I not know that you were leaving with my soul?

  I met you when the sun was tired
  Your eyes open and happiness too faulty like waves
  To reach out, to touch - you remained secretive of your pain
  You were leaving and I was watching 
  How did I not know that you were leaving with my heart?

  I walked under the pouring rain
  Darkness seeping in my clothes and veins
  Walking yet again blindly
  Following a path I do not know

  The heavy rain so strong it hurts
  I found myself to the place I learned:
  You were there - eyes closed but a smile on your face
  To reach out, to touch- your secrets unfold
  How did I not know that you were leaving for good?
        `;