import React from 'react';
import { Platform, StatusBar, View, Button } from 'react-native';

import styles from '../assets/styles';

export class Btn extends React.Component {
  render() {
    return (
    <View style={{ padding : 5 } , this.props.destructive ? styles.destButton : styles.button}>
        <Button 
        onPress={this.props.onPress}
        accessibilityLabel = {this.props.accessibilityLabel}
        title={this.props.title} />
    </View>
    );
  }
}
