import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage,
  Alert,
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';

import colors from '../../constants/Colors';

import { 
  Avatar,
  Text,
  Card,
} from 'react-native-elements';

import styles from '../../constants/AdminScreenStyles'

import { PCP_SERVER } from '../../assets/ImportantThings'

export default class Messages extends React.Component {
  static navigationOptions = {
    title: 'Messages',
  };

  constructor(props){
    super(props);
    this.state = {
        messages : [],
    }
  }
  
  getFeedbacks(){
    fetch(`${PCP_SERVER}/feedbacks`)
    .then(response => response.json())
    .then(json => {
      console.log(json.res);
      this.setState({ messages : json.res });
    });
  }

  doneWithThis(msg){
    Alert.alert(
      'Confirmation',
      'Are you sure you are done with this message?',
      [
        {text: 'No', onPress: () => {return} , style:'cancel'},
        {text: 'Yes', onPress: () => this.deleteForReal(msg)},
      ]
    )
  }

  deleteForReal(msg){
    const id = this.state.selectedID;
    this.setState({ confirmationModal: false });
    fetch(`${PCP_SERVER}/feedbacks/delete?feedbackID=${msg.feedbackID}`)
    .then(response => response.json())
    .then(response => {
        if(response.msg == 'success'){
            Alert.alert(
              'Success',
              'Message successfully deleted!',
              [
                {text: 'Undo', onPress: () => {this.ohDamPutItBackIn(msg)} , style:'cancel'},
                {text: 'Ok', onPress : () => {this.getFeedbacks()}}
              ]
            )
        }
    })
    .catch(() => {
      Alert.alert(
        'Connection error',
        'There seems to be an error with the connection. Please check your internet connection and try again.',
        [
          {text: 'OK'}
        ]
      )
    });
  }

  ohDamPutItBackIn(msg){
  fetch(`${PCP_SERVER}/feedbacks/add?feedbackID=${msg.feedbackID}&userID=${msg.userID}&feedbackContent=${msg.feedbackContent}`)
  .then(response => response.json())
  .then(response => {
      if(response.msg == 'success'){
        Alert.alert(
          'Reverted',
          `Deletion of message reverted.`,
          [
            {text: 'OK'},
          ]
        )
      }else{
        Alert.alert(
          'Error',
          `An error occurred. Please try again.`,
          [
            {text: 'OK'},
          ]
        )
      }
  })
  .catch(() => {
    Alert.alert(
      'Connection error',
      'There seems to be an error with the connection. Please check your internet connection and try again.',
      [
        {text: 'OK'}
      ]
    )
  });

  }
  componentDidMount(){
    this.getFeedbacks();
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
    <View style={styles.container}>
        <View style={{
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
              Messages
            </Text>
          </View>
        </View>
        <ScrollView>
        {this.state.messages.map((msg) => (
          <Card key={msg.feedbackID}>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.cardTitle}>
                  {msg.feedbackContent}
                </Text>
                <Text style={styles.cardSubtitle}>
                  {`from ${msg.firstName}`}
                </Text>
              </View>
              <TouchableOpacity style={styles.button} 
                onPress={() => this.doneWithThis(msg)}>
                <Text style={styles.cardAction}>
                  X
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
        </ScrollView>
    </View>
    );
  }
  
}