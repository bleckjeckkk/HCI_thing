import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { 
  View,
  ScrollView,
} from 'react-native';
import { Text, Card } from 'react-native-elements';

import styles from '../../constants/HomeScreenStyles';


export default class FAQScrn extends React.Component {
  constructor(props){
    super(props);
  };

  FAQitems = [
    {
      question : 'How do I search?',
      answer : 'Input your search string in the searchbox. And then tap on the Search button directly below the search bar.'
    },
    {
      question : `What does [Not Available] before a product's name in the missing items list mean?`,
      answer : 'A product with that label means that the product is not available in the supermarket.'
    },
    {
      question : `A product is missing in a supermarket!`,
      answer : `Please send a feedback by going to the Settings tab on the right side of the screen, and then tap the Contact Us button. A feedback box can be used to receive your messages. Tap the Send Feedback button when you're done with inputting`
    },
    {
      question : `What happens if I search an item that is not in the database?`,
      answer : `The search results screen will not show results but will show a placeholder text, 'No Products Found'`
    },
    {
      question : `How do I add more items into my Favorites List?`,
      answer : 'You can only add more items into your favorites list through opening the Product List in the Results Screen and pressing on the Save List button at the top. However, this will overwrite your current favorite list'
    },
  ];

  static navigationOptions = {
    title: 'FAQ',
  };

  componentDidMount(){
    console.log(this.FAQitems);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.faq_headerText}>
          Frequently Asked Questions
        </Text>
        <ScrollView>
        {this.FAQitems.map((faq,i)=> {
          return(
            <View style={styles.faqContainer} key={i}>
              <Text style={faq.question.length > 20 ? styles.smallerHeaderText : styles.headerText }>
                {faq.question}
              </Text>
              <Text style={{...styles.faq_subheaderText}}>
                {faq.answer}
              </Text>
            </View>
          )
        })}
        </ScrollView>
      </View>
    );
  }
}
