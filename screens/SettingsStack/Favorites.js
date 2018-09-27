import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { 
  View,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text, Card } from 'react-native-elements';

import styles from '../../constants/HomeScreenStyles';

import { PCP_SERVER } from '../../assets/ImportantThings';

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

export default class FavScrn extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          open : false,
          favItemsParsed : [],
      };
  }

  static navigationOptions = {
    title: 'Favorites',
  };

  getProducts(items){
    fetch(`${PCP_SERVER}/products/getProducts?products=${JSON.stringify(items)}`)
    .then(response => response.json())
    .then(response => {
        this.setState({
            favItemsParsed : response.res,
        });
    });
  }

  componentDidMount(){
    AsyncStorage.getItem('info')
    .then((value) => JSON.parse(value))
    .then((value) => {
      const userID = value.user.id;
      fetch(`${PCP_SERVER}/users/info?id=${userID}`)
      .then(response => response.json())
      .then(response => {
          usr = response.user;
          this.getProducts(JSON.parse(response.user.favItems));
          this.setState({ 
              favItems : response.user.favItems,
          });
      });
    });
  }

  addToList(value){
    var temp = this.state.favItemsParsed.slice();
    temp.push(value);
    this.setState({
        favItemsParsed : temp
    });
  }
  
  removeFromList = (product) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to remove this product from your favorites list?',
      [
        {text: 'Cancel', onPress: () => {return} , style:'cancel'},
        {text: 'Yes', onPress: () => this.deleteForReal(product)},
      ]
    )
  };

  deleteForReal = (product) => {
    var temp = this.state.favItemsParsed.slice();
    const index = temp.indexOf(product);
    temp.splice(index,1);
    this.setState({
      favItemsParsed : temp, 
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


  saveList(){
    const temp = this.state.favItemsParsed.slice();
    var items = [];
    temp.map( (item) => {
      items.push(item.p_ID);
    });
    var userID = this.props.navigation.getParam('id', -1);
    fetch(`${PCP_SERVER}/users/updateFav?userID=${userID}&favItems=${JSON.stringify(items)}`)
    .then(response => response.json())
    .then(response => {
        if(response.msg == 'success'){
          Alert.alert(
              'List Updated',
              'Favorite List Updated',
              [
                {text: 'OK', onPress: () => this.setState({ loading : false })},
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

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <Text style={styles.faq_headerText}>
          Favorite Items
        </Text>
        <View style={styles.itemListContainer}>
          <ScrollView>
          {this.state.favItemsParsed.map((item,i)=> {
            return(
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
            )
          })}
          </ScrollView>
          <TouchableOpacity
            style={{...styles.button}}
            onPress={() => {
              this.saveList();
            }}>
            <Text style={styles.btnText}>UPDATE LIST</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
