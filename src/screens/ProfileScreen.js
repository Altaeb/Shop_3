import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Separator } from 'native-base';
import { ScrollView, StyleSheet, View, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import Hyperlink from 'react-native-hyperlink';
import { NavigationActions } from 'react-navigation';

export default class ProfileScreen extends Component {
  
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {height: 40}
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {}
    }
  }

  componentDidMount = async () => {
   let token = await AsyncStorage.getItem('token');
   console.log('User ');
   fetch('http://api.youaref.biz/user',{
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
          user: responseJson.data[0],
          
        }, function() {
          console.log('User '+this.state.user);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  logoutbutton = async () => {
  const resetActionLogin = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login'})
      ]
    });
      
  this.props.navigation.dispatch(resetActionLogin);  
  AsyncStorage.clear();
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
        <Content>
          {/*<Image 
            style={styles.thumbnailStyle} 
            source={{ uri: 'http://media.corporate-ir.net/media_files/IROL/17/176060/img/logos/amazon_logo_RGB.jpg' }}
          />*/}
          <List>
            <ListItem>
              <Text>User ID - {this.state.user.id}</Text>
            </ListItem>
            <ListItem>
              <Text>{this.state.user.user_name}</Text>
            </ListItem>
            <ListItem>
              <Text>{this.state.user.email}</Text>
            </ListItem>
            <ListItem>
              <Text>{this.state.user.phone}</Text>
            </ListItem>
            <ListItem>
              <Text>{this.state.user.address}</Text>
            </ListItem>
            <ListItem>
              <Hyperlink linkDefault={ true }>
                <Text style={styles.linkStyle}>{this.state.user.cv}</Text>
              </Hyperlink>
            </ListItem>
          </List>
          <View style = {styles.loginButton}>
            <Button
                onPress={() => navigate('BankDetailsScreen')}
                title="ADD BANK DETAILS"
                color='white'
                backgroundColor='black'
                fontWeight='bold'
                fontSize={18}
                borderRadius = {10}
              />
          </View>

          <View style = {styles.loginButton}>
            <Button
                onPress={this.logoutbutton}
                title="LOGOUT"
                color='white'
                backgroundColor='black'
                fontWeight='bold'
                style = {styles.loginButton}
                borderRadius = {10}
              />
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
  thumbnailStyle: {
    resizeMode: 'contain',
    marginTop: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    height: 100,
    width: 100,
    alignSelf:'center'
  },
  loginButton: {
    marginTop: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  loginButtonText: {
    fontSize: 18,
  },
  linkStyle: {
    fontSize:16,
    color: '#2980b9',
    paddingTop: 10,
  },
});