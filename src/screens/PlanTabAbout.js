import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Separator, Button } from 'native-base';
import { ScrollView, StyleSheet, View, Image, TextInput, AsyncStorage, ActivityIndicator, RefreshControl } from 'react-native';
import PlansScreen from './PlansScreen';

export default class PlanTabAbout extends Component {

  constructor(props) {
    super(props);
    this.sampleProps = this.props;
    this.state = {
      isLoading: true,
      About:{},
      refreshing: false,
    }
  }

  _onRefresh() { 
    this.setState({refreshing: true}); 
    setTimeout(() => {
      this.componentDidMount();
      this.setState({
        refreshing: false
      }); 
    },3000); 
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
          About: responseJson.data,
        }, function() {
         // console.log(this.state.plans)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
  }

    return (
      <Container style={styles.container} >
        <Content>
          <List
            refreshControl={ 
              <RefreshControl 
                refreshing={this.state.refreshing} 
                onRefresh={this._onRefresh.bind(this)} 
              /> 
            }>
            <ListItem>
              <Body>
                <View>
                  <Text>About the plan</Text>
                  <Text note>{this.state.About.about}</Text>
                </View>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <View>
                  <Text>Conversion</Text>
                  <Text note>{this.state.About.conversion}</Text>
                </View>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <View>
                  <Text>Earn per conversion</Text>
                  <Text note>{this.state.About.earn_per_conversion}</Text>
                </View>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <View>
                  <Text>Price of the product</Text>
                  <Text note>{this.state.About.price_of_product}</Text>
                </View>
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

});