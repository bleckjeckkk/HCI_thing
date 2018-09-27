import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { 
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TextInput,
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    Alert,
} from 'react-native';

import { Button } from 'react-native-elements';

import sizes from '../constants/Sizes';
import colors from '../constants/Colors';
import componentStyles from '../assets/styles/ComponentStyles';
import styles from '../constants/LoginStyles';

const PCP_SERVER = 'http://' + '192.168.254.180' + ':4000'

export default class Login extends React.Component {
    static navigationOptions = {

    };

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loading : false,
            usernameError : false,
            passwordError : false,
        }
    }

    onSubmit(){
        if(this.state.username === '' || this.state.password === ''){
            var str = 'Please input ';
            if(this.state.username === ''){
                this.setState({usernameError : true, username : ''});
                str = str + 'username '
            }else{
                this.setState({usernameError : false});
            }
            if(this.state.username === '' && this.state.password === ''){
                this.setState({passwordError : true, password : '' });
                str = str + 'and password'
            }else if(this.state.password === ''){
                this.setState({passwordError : true, password : '' });
                str = str + 'password'
            }else{
                this.setState({passwordError : false});
            }
            this.setState({ loading : false });
            Alert.alert(
                'Error',
                str,
                [
                    {text: 'OK', onPress: () => this.setState({ loading : false })},
                ]
            )
            
            return;
        }

        this._signInAsync()
    }

    _signInAsync = async () => {
        const credentials = {
            username : this.state.username,
            password : this.state.password,
        }
        fetch(`${PCP_SERVER}/users/auth?userName=${credentials.username}&userPassword=${credentials.password}`)
        .then(response => response.json())
        .then(response => {
            if(response.auth){
                if(response.admin){
                    const info = {
                        admin : true,
                        auth : true,
                        user : response.user,
                    }
                    AsyncStorage.setItem('userToken', credentials.username);
                    AsyncStorage.setItem('info',JSON.stringify(info));
                    this.props.navigation.navigate('Admin');
                }else{
                    const info = {
                        admin : false,
                        auth : true,
                        user : response.user,
                    }
                    AsyncStorage.setItem('userToken', credentials.username);
                    AsyncStorage.setItem('info',JSON.stringify(info));
                    this.props.navigation.navigate('Main');
                }
            }else{
                Alert.alert(
                    'Error',
                    'You have inputted the wrong username/password. Try again.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                this.setState({ username : '', password : '' , loading : false });
                //this.showSnackbar('error',"You have inputted the wrong username/password. Try again.");
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
    };

    //every letter entered on username, the state is changed
    onChangeUsername(value){
        this.setState({
            username:value
        });
    }

    //every letter entered on password, the state is changed
    onChangePassword(value){
        this.setState({
                password:value
        });
    }

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
        * content, we just wanted to give you a quick view of your config */
        return (
        <SafeAreaView style={styles.screen.mainContainer}>
            <View style={styles.screen.loginContainer}>
                <View style={styles.screen.loginSquare}>
                    <View style={styles.screen.loginHeader}>
                        <Text style={styles.screen.sectionTitleLogin}>Login</Text>
                    </View>
                    <Text style={styles.screen.sectionLogin}>Username</Text>
                    <TextInput 
                        placeholder='username/password'
                        style={this.state.usernameError ? styles.screen.errtextInput : styles.screen.textInput}
                        value={this.state.username}
                        onChangeText={(value) => this.onChangeUsername(value)}
                        />
                    <Text style={styles.screen.sectionLogin}>Password</Text>
                    <TextInput 
                        placeholder='password'
                        style={this.state.passwordError ? styles.screen.errtextInput : styles.screen.textInput}
                        secureTextEntry = {true}
                        value={this.state.password}
                        onChangeText={(value) => this.onChangePassword(value)}
                    />
                    <Button title='Login'
                        loading={this.state.loading}
                        disabled={this.state.loading}
                        buttonStyle={styles.screen.loginButton}
                        onPress={() => {
                            this.setState({loading:true});
                            this.onSubmit()
                        }}
                        />
                </View>
            </View>
        </SafeAreaView>
        );
    }
}