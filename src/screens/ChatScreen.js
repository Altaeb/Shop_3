import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';
import { ScrollView, StyleSheet, View, Image, TextInput, WebView, ActivityIndicator } from 'react-native';

export default class FaqScreen extends Component {
  
  static navigationOptions = {
    title: 'Chat',
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
        this.setState({
          isLoading: false
        }); 
      },10000); 
  }

  render() {  
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container} >
        <WebView source={{uri: 'https://tawk.to/chat/59de80164854b82732ff5012/default/?$_tawk_popout=true'}} style={{marginTop: 20}} />
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