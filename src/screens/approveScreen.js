import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Separator, Button } from 'native-base';
import { ScrollView, StyleSheet, View, Image, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class approveScreen extends Component {
  
  static navigationOptions = {
    header: null,
  };

  render() {
    
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container} >
        <Content>
          <View style={styles.view}>
            <FontAwesome name="check-square-o" size={80} color="#000000" />
            <Text style={styles.text}>
            Congrats, you have successfully registered and your profile is currently being reviewed.
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fad30a',
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  view: {
    padding:48,
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
    textAlign:'center',
  },
});