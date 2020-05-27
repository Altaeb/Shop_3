import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Body, Separator, Button } from 'native-base';
import { ScrollView, StyleSheet, View, Image, Text, TextInput } from 'react-native';

export default class FaqScreen extends Component {
  
  static navigationOptions = {
    title: 'FAQs',
    headerStyle: {height: 40}
  };

  render() {
    
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container} >
        <Content>

        <List>
            <ListItem>
              <Body>
                <Text style={styles.questionStyle} >How will I get a mission?</Text>
                <Text style={styles.answerStyle} >You’ll be interviewed from the HR manager for 5 mins either on call or video.</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={styles.questionStyle}>Do I get any training kit before going for a mission?</Text>
                <Text style={styles.answerStyle} >Yes, you will get the training kit from the concerned brand.</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={styles.questionStyle}>How will you earn INR 100/Hour ?</Text>
                <Text style={styles.answerStyle} >After completing the mission, you have to report your HR manager. Once your HR manager approves that you have done your task, you will get credit in your wallet and you can redeem it right away.</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={styles.questionStyle}>What I have to report?</Text>
                <Text style={styles.answerStyle} >You have to report the summary and deliverables of the hour spent working.</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={styles.questionStyle}>Whom I have to report or answer?</Text>
                <Text style={styles.answerStyle} >You have to report your HR manager.</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={styles.questionStyle}>You don’t find your question here?</Text>
                <Text style={styles.answerStyle} >Write us directly on whatsapp - +917888000008</Text>
              </Body>
            </ListItem>
          </List>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  questionStyle: {
    fontWeight:'bold',
    fontSize:18
  },
  answerStyle: {
    fontSize:16
  },
});