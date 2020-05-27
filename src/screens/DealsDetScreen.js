import React, { Component } from 'react';
import { Container, Header, Content, List, Icon, ListItem, Thumbnail, Text, Body, Card, CardItem, Button } from 'native-base';
import { View, Image, StyleSheet } from 'react-native';

export default class CampaignsDetScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
  });

  render() {
    
    const { params } = this.props.navigation.state;
    
    return (
      <Container style={styles.container}>
        <Content>
          <List>
            <ListItem>
                <Body>
                  <View style={{ flex:1,flexDirection: 'row',alignItems:'flex-start',justifyContent:'flex-start' }}>
                    <Text style={{ color: '#778899' }}> Status: </Text> 
                    <Text style={{ color: '#778899' }}> Approved </Text>
                  </View>
                </Body>
            </ListItem>

            <ListItem>
              <Body>
                  <View style={{ flex:1,flexDirection: 'row',alignItems:'flex-start',justifyContent:'flex-start' }}>
                    <Text style={{ color: '#778899' }}> Campaign: </Text> 
                    <Text style={{ color: '#778899' }}> Amazon </Text>
                  </View>
                </Body>
            </ListItem>

            <ListItem>
              <Body>
                  <View style={{ flex:1,flexDirection: 'row',alignItems:'flex-start',justifyContent:'flex-start' }}>
                    <Text style={{ color: '#778899' }}> Plan: </Text> 
                    <Text style={{ color: '#778899' }}> Basic </Text>
                  </View>
              </Body>
            </ListItem>

            <ListItem>
              <Body>
                  <View style={{ flex:1,flexDirection: 'row',alignItems:'flex-start',justifyContent:'flex-start' }}>
                    <Text style={{ color: '#778899' }}> Buyer: </Text> 
                    <Text style={{ color: '#778899' }}> Alok Singh </Text>
                  </View>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                  <View style={{ flex:1,flexDirection: 'row',alignItems:'flex-start',justifyContent:'flex-start' }}>
                    <Text style={{ color: '#778899' }}> Phone: </Text> 
                    <Text style={{ color: '#778899' }}> 8195910238 </Text>
                  </View>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                  <View style={{ flex:1,flexDirection: 'row',alignItems:'flex-start',justifyContent:'flex-start' }}>
                    <Text style={{ color: '#778899' }}> Added on: </Text> 
                    <Text style={{ color: '#778899' }}> 28th Aug 2017 </Text>
                  </View>
              </Body>
            </ListItem>
            
          </List>

          <Text style={{ paddingLeft: 20, paddingTop: 20,}}>Deal Activity</Text>

          <View style={{ padding: 20, paddingTop: 5,}}>
            <View style={styles.reviewsStyle} >
              <List>
                <ListItem>
                  <Text>Simon Mignolet</Text>
                </ListItem>
                <ListItem>
                  <Text>Nathaniel Clyne</Text>
                </ListItem>
                <ListItem>
                  <Text>Dejan Lovren</Text>
                </ListItem>
              </List>
            </View>
          </View>
          
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  thumbnailText: {
    fontSize: 18,
    alignSelf: 'center',
  },
  viewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  reviewsStyle: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5
  },
  headFont: {
  },
  paraFont: {
    fontSize: 13,
    color : '#5f7f94',
    lineHeight: 25,
    fontWeight: '100'
  },
  CardItemStyle: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },

});