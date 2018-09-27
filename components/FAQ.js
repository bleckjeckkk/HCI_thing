import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

export class FAQcontainer extends React.Component {
  render() {
    return(
        <Card>
            <Text>{this.props.question}</Text>
            <Text>{this.props.answer}</Text>
        </Card>
    );
  }
}