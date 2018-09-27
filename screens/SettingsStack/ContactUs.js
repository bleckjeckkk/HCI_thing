import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { 
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Text, Button } from 'react-native-elements';

import styles from '../../constants/HomeScreenStyles';

import { PCP_SERVER, MAX_LENGTH } from '../../assets/ImportantThings'

export default class ContactUsScrn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error : false,
      feedback : '',
      fbLength : 0,
      userID : '',
    }
  }

  static navigationOptions = {
    title: 'Contact Us',
  };

  onChangeFeedback(value){
    if(value.length > MAX_LENGTH){
      this.setState({error : true,})
    }else{
      this.setState({error : false,})
    }
    this.setState({
      feedback : value,
      fbLength : value.length,
    })
  }

  getMaxID(){
    fetch(`${PCP_SERVER}/feedbacks/getCount`)
    .then(response => response.json())
    .then(json => {
        const next = json.res[0].count + 1;
        this.setState({ lastFeedbackID : next});
    });
  }

  getUserID(){
    AsyncStorage.getItem('info')
    .then((value) => JSON.parse(value))
    .then((value) => this.setState({ userID : value.user.id }));
  }

  sendFeedback(){
    if(this.state.feedback.length > MAX_LENGTH || this.state.feedback === ''){
      if(this.state.feedback.length > MAX_LENGTH){
        Alert.alert(
          'Length exceeded',
          `Your message has exceeded ${MAX_LENGTH} characters. Please remove some parts`,
          [
              {text: 'OK', onPress: () => this.setState({ loading : false })},
          ]
        )
      }else{
        Alert.alert(
          'Invalid input',
          `Please enter something in the message box`,
          [
              {text: 'OK', onPress: () => this.setState({ loading : false, error : true })},
          ]
        )
      }
    }else{
      fetch(`${PCP_SERVER}/feedbacks/add?feedbackID=${this.state.lastFeedbackID}&userID=${this.state.userID}&feedbackContent=${this.state.feedback}`)
      .then(response => response.json())
      .then(response => {
          if(response.msg == 'success'){
            Alert.alert(
              'Feedback sent',
              `Feedback sent! Thank you.`,
              [
                  {text: 'OK'},
              ]
            )
            this.setState({ feedback : '' });
          }else{
            Alert.alert(
              'Error',
              `An error occurred. Please try again.`,
              [
                  {text: 'OK'},
              ]
            )
          }
          this.getMaxID();
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
  }

  componentDidMount(){
    this.getUserID();
    this.getMaxID();
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{paddingHorizontal : 20 , flex : 1}}>
            <Text style={styles.headerText}>
              Contact Us
            </Text>
            <Text style={styles.subheaderText}>
              The admins can be contacted through the feedback function in this screen.
            </Text>
          </View>
          <View style={{marginTop : '5%' ,paddingHorizontal : 20 , flex : 3,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',}}>
            <Text style={styles.headerText}>
              Feedback
            </Text>                    
            <TextInput 
              placeholder='Write your feedback here...'
              style={this.state.error ? styles.textBoxErr : styles.textBox}
              value={this.state.feedback}
              onChangeText={(value) => this.onChangeFeedback(value)}
            />
            <Text style={this.state.error ? styles.lengthTextErr : styles.lengthText}>
              {`${this.state.fbLength}/${MAX_LENGTH}`}
            </Text>    
            <Button title='Send Feedback'
                loading={this.state.loading}
                disabled={this.state.loading}
                buttonStyle={{...styles.button, marginTop : 10}}
                titleStyle={styles.btnText}
                onPress={() => this.sendFeedback()}
                />
          </View>      
        </ScrollView>
      </View>
    );
  }
}
