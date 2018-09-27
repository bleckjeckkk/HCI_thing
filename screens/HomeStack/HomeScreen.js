import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  SafeAreaView,
  TextInput,
  Alert,
  AsyncStorage,
} from 'react-native';

import { 
  Card, 
  ListItem, 
  Button 
} from 'react-native-elements';

import { MonoText } from '../../components/StyledText';

import styles from '../../constants/HomeScreenStyles';

import { PCP_SERVER } from '../../assets/ImportantThings';

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header : null
  };

  constructor(props){
    super(props);
    this.state = {
      modalVisible : false,
      text : '',
      item : 
      {
        title : '',
        subtitle : '',
        additionalInfo : {
          text : ''
        }
      },
      queriedItems : [],
      selectedItems : [],
    }
  }

  showItemModal(item){
    this.setState({
      modalVisible : !this.state.modalVisible,
      item : item,
    })
  }

  hideModal(){
    this.setState({
      modalVisible : false,
      loading : false,
    })
  }

  onChangeText(value){
    this.setState({ text : value})
  }

  onSubmit(){
    fetch(`${PCP_SERVER}/products/find?productName=${this.state.text}`)
    .then(response => response.json())
    .then(json => {
        this.setState({ queriedItems : json.res, modalVisible:true });
        console.log(json.res);
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

  addToList(value){
    var temp = this.state.selectedItems.slice();
    var found = temp.some(function (prod) {
        return (prod.p_ID === value.p_ID) || (prod.matched_ID === value.p_ID);
    });
    if(!found){
        temp.push(value);
        this.hideModal();
    }else{
      Alert.alert(
        'Duplicate Selected',
        'The product (or equivalent) is already in your list.',
        [
            {text: 'OK'},
        ]
      )
    }
    this.setState({
        selectedItems : temp,
        text : ''
    });
  }

  removeFromList = (product) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to remove this product from your list?',
      [
        {text: 'Cancel', onPress: () => {return} , style:'cancel'},
        {text: 'Yes', onPress: () => this.deleteForReal(product)},
      ]
    )
  };

  deleteForReal = (product) => {
    var temp = this.state.selectedItems.slice();
    const index = temp.indexOf(product);
    temp.splice(index,1);
    this.setState({
        selectedItems : temp, 
    });
    Alert.alert(
      'Removed',
      'The product has been removed from your list',
      [
        {text: 'Undo', onPress: () => {this.addToList(product)}},
        {text: 'Ok'},
      ]
    )
  };

  saveListLocal(){
    const temp = this.state.selectedItems.slice();
    var items = [];
    temp.map( (item) => {
        items.push(item.p_ID);
    });
    AsyncStorage.setItem('selectedItems', JSON.stringify(items));
    this.props.navigation.navigate('Home2', {items : items});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{...styles.header, 
          }}>
          <Text style={styles.headerText}>
            THE PRICE CHECK PROGRAM
          </Text>
          <TextInput 
              placeholder='Search for products...'
              style={styles.textInput}
              value={this.state.text}
              onChangeText={(value) => this.onChangeText(value)}
          />
          <Button title='Search'
            loading={this.state.loading}
            disabled={this.state.loading}
            buttonStyle={styles.button}
            onPress={() => {
                this.setState({loading:true});
                this.onSubmit()
            }}
          />

        {!isEmpty(this.state.selectedItems) ? (
          <View style={styles.itemListContainer}>
            <Text style={{...styles.inputCaption}}>Items</Text>
            <ScrollView style={{}}>
              {this.state.selectedItems.map(item => (
                <Card key={item.p_ID}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle} key={item.p_ID}>
                      {item.p_name}
                    </Text>
                    <TouchableOpacity style={styles.button} 
                      onPress={() => this.removeFromList(item)}>
                      <Text style={styles.cardAction}>
                        X
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </ScrollView>
            <Button title='Compare'
              loading={this.state.loading}
              disabled={this.state.loading}
              buttonStyle={{...styles.button, marginTop : 10}}
              onPress={() => {
                this.saveListLocal();
              }}
            />
          </View>
        ) : (<View></View>)}
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={styles.flexContainer}>
            <Text style={{...styles.headerText, color : 'black' }}>
              Search Results:
            </Text>
            <ScrollView>
            {!isEmpty(this.state.queriedItems) ? (
              this.state.queriedItems.map(item => (
                <TouchableOpacity 
                  key = {item.p_ID}
                  onPress={() => this.addToList(item)}>
                  <Card>
                    <View>
                      <Text style={styles.cardTitle}>
                        {item.p_name}
                      </Text>
                      <Text style={styles.cardSubtitle}>
                        Php {item.p_price.toFixed(2)} -- {item.p_market}
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              ),this)
            ): (
              <Text style={{...styles.smallerHeaderText, color : 'gray' , marginTop : 20}}>
                No Products Found.
              </Text>
            )}
            {}
            </ScrollView>
            <TouchableOpacity
              style={{...styles.button2}}
              onPress={() => {
                this.hideModal();
              }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

}
