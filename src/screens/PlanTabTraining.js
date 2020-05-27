import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Separator, Button } from 'native-base';
import { ScrollView, StyleSheet, View, Image, TextInput } from 'react-native';

export default class PlanTabTraining extends Component {

  /*constructor(props) {
    super(props);
    this.sampleProps = this.props;
  }

  componentDidMount = async () => {
    let token = await AsyncStorage.getItem('token');
    
    fetch(`http://api.youaref.biz/plan/${this.sampleProps.sampleProps}`,{
       method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Host': 'api.youaref.biz'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          reviews: responseJson.data.reviews.data,
          
        }, function() {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } */

  render() {
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