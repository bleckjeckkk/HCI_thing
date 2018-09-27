import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Modal,
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../../components/StyledText';

import { 
  FlatList,
  Card,
  Icon,
} from 'react-native-elements';

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
  constructor(props){
      super(props);
      this.state = {
          toBeComparedItems : [],
          results : [],
          modalVisible : false,
          itemsToShow : [],
          headerText : '',
      };
  }

  static navigationOptions = {
    title: 'Results'
  };

  getProductEquivalents(toBeCompared){
    return fetch(`${PCP_SERVER}/products/getProducts?products=${JSON.stringify(toBeCompared)}`)
    .then(response => response.json())
  }

  getSupermarkets(){
    return fetch(`${PCP_SERVER}/supermarkets`)
    .then(response => response.json())
  }

  getAll(toBeCompared){
    return Promise.all([this.getProductEquivalents(toBeCompared),this.getSupermarkets()])
  }

  getUserID(){
    AsyncStorage.getItem('info')
    .then((value) => JSON.parse(value))
    .then((value) => this.setState({ userID : value.user.id }));
  }

  componentDidMount(){
    this.getUserID();
    var toBeCompared = this.props.navigation.getParam('items', {});
    
    this.getAll(toBeCompared)
    .then(([products,supermarkets])=>{
        var sprMkt = [];
        var prod = products.res.slice();
        supermarkets.res.map((item) => {
            var totalAmount = 0;
            var msng = [];
            var avail = [];
            prod.map((product) => {
                if(product.p_marketID == item.supermarketID && (product.p_availability)){
                    totalAmount += product.p_price;
                    const p = {
                        p_ID: product.p_ID,
                        p_name: product.p_name,
                        p_price : product.p_price,
                    };
                    avail.push(p);
                }else if(product.matched_marketID == item.supermarketID && (product.matched_availability)){
                    totalAmount += product.matched_price;
                    const p = {
                        p_ID: product.matched_ID,
                        p_name: product.matched_name,
                        p_price : product.matched_price,
                    };
                    avail.push(p);
                }else{
                    const missing = product.matched_marketID == item.supermarketID;
                    const p = {
                        p_ID: product.p_ID,
                        p_name: `${missing ? (`[Not available] ${product.p_name}`) :(product.p_name) }`,
                        p_price : product.p_price,
                    };
                    msng.push(p);
                }
            });
            sprMkt.push({
                supermarketID : item.supermarketID,
                supermarketName : item.supermarketName,
                total : totalAmount,
                missing : msng,
                available : avail,
            });
        });
        sprMkt.sort(function(a, b){return a.total - b.total})
        this.setState({ results : sprMkt , myProducts : prod});
        console.log(sprMkt);
    });
  }

  componentWillUnmount(){
      this.setState({
          toBeComparedItems : [],
          results : [],
          showMissingProductsModalOpen : false,
          dialogItems : [],
          dialogTitle : '',
      });
  }

  showMyList(){
    this.setState({
      itemsToShow : this.state.myProducts,
      headerText : 'Items in Your List',
      modalVisible : true,
      showSave : true,
    })
  }

  showAvailable(data){
    this.setState({
      itemsToShow : data,
      headerText : 'Items in Supermarket',
      modalVisible : true,
      showSave : false,
    })
  }

  showMissing(data){
    this.setState({
      itemsToShow : data,
      headerText : 'Items not in Supermarket',
      modalVisible : true,
      showSave : false,
    })
  }

  hideModal(){
    this.setState({
      itemsToShow : [],
      headerText : '',
      modalVisible : false,
    })
  }

  saveList(){
    const temp = this.state.myProducts.slice();
    var items = [];
    temp.map( (item) => {
      items.push(item.p_ID);
    });
    fetch(`${PCP_SERVER}/users/updateFav?userID=${this.state.userID}&favItems=${JSON.stringify(items)}`)
    .then(response => response.json())
    .then(response => {
        if(response.msg == 'success'){
          Alert.alert(
              'List Saved',
              'List saved as favorite list.',
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
    return (
      <View style={styles.container}>
        {!isEmpty(this.state.results) ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
            { (this.state.results.length > 1 ? (
              (this.state.results[0].total == this.state.results[1].total ? (
                  `Well done! You can't save money.`
              ) : (
                  this.state.results[0].missing.length==0 ? (
                      `Well done! You can save more at ${this.state.results[0].supermarketName}.`
                  ) : (
                      `Well done! You can save more at ${this.state.results[0].supermarketName}. But there are missing items.`
                  )
              ))
            ) : (
                `Well done! You can save more at one and only ${this.state.results[0].supermarketName}`
            ))}
            </Text>
            <TouchableOpacity style={styles.button3} 
              onPress={() => this.showMyList()}>
              <Text style={styles.cardActionNotDelete}>
                SHOW MY LIST
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3} 
              onPress={() => this.props.navigation.pop()}>
              <Text style={styles.cardActionNotDelete}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        ):(
          <View></View>
        )}
        <View style={styles.itemListContainer}>
          <ScrollView>
            {this.state.results.map((row) => (
              <View key={row.supermarketID}>
                <Card>
                  <View>
                    <Text style={styles.cardTitle}>Php {row.total.toFixed(2)}</Text>
                    <Text style={styles.cardSubtitle}>{row.supermarketName}</Text>
                  </View>
                  <View style={{...styles.cardContent, marginTop : 10 }}>
                    <TouchableOpacity style={styles.cardButton} 
                      onPress={() => this.showAvailable(row.available)}>
                        <View style={{ flexDirection : 'row', alignItems : 'center'}}>
                          <Icon
                            name='info'
                            color={styles.container.backgroundColor} /> 
                          <Text style={styles.cardActions}>
                            [{row.available.length}] AVAILABLE
                          </Text>
                        </View>
                    </TouchableOpacity>
                    {!isEmpty(row.missing) ? (
                      <TouchableOpacity style={styles.cardButton} 
                        onPress={() => this.showMissing(row.missing)}>
                        <View style={{ flexDirection : 'row', alignItems : 'center'}}>
                          <Icon
                            name='warning'
                            color='rgba(255,160,0,0.75)' /> 
                          <Text style={styles.cardActions}>
                            [{row.missing.length}] MISSING
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <View> </View>
                    )}

                  </View>
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={styles.flexContainer}>
            <Text style={{...styles.headerText, color : 'black' }}>
              {this.state.headerText}
            </Text>
            <TouchableOpacity
              style={{...styles.button2}}
              onPress={() => {
                this.saveList();
              }}>
              <Text>SAVE LIST</Text>
            </TouchableOpacity>
            <ScrollView>
            {this.state.itemsToShow.map(item => (
              <TouchableOpacity 
                key = {item.p_ID}>
                <Card>
                  <View>
                    <Text style={styles.cardTitle}>
                      {item.p_name}
                    </Text>
                    <Text style={styles.cardSubtitle}>
                      Php {item.p_price}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ),this)}
            </ScrollView>
            <TouchableOpacity
              style={{...styles.button2}}
              onPress={() => {
                this.hideModal();
              }}>
              <Text>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}