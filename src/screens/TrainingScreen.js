import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Separator } from 'native-base';
import { StyleSheet, View } from 'react-native';
export default class PlansScreen extends Component {
  
  static navigationOptions = {
    title: 'Training',
  };

  render() {
    
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container} >
        <Content>
        
        
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});