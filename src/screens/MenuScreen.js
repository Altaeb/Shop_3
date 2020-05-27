import React from 'react';
import { ScrollView, StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Icon } from 'native-base';

export default class MenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Menu',
    headerLeft: null,
    headerStyle: {height: 40}
    
  }

  constructor() {
    super();
    this.state = {
      username:'',
    };
  }

  componentDidMount = async () => {
    let token = await AsyncStorage.getItem('token');
    
    fetch('http://api.youaref.biz/home',{
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
          //home: responseJson.data[0],
          username: responseJson.data[0].name,
          
        }, function() {
          //console.log('name:  ' + this.state.home.name);
          //console.log('username:' + this.state.username);
        });
      })
      .catch((error) => {
        console.error(error);
      });

      
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container} >
        <Content>
          <View style={styles.headerViewStyle}>
            <View style={styles.headerTextStyle}>
              <Text style={styles.nameStyle}>{this.state.username}</Text>
              <Text 
               note 
               style={styles.buttonStyle} 
               onPress={() => navigate('ProfileScreen')}>
               View Profile
              </Text>
            </View>
            {/*<View>
              <Image 
                 style={styles.thumbnailStyle} 
                 source={{ uri: 'http://media.corporate-ir.net/media_files/IROL/17/176060/img/logos/amazon_logo_RGB.jpg' }}
              />
            </View>*/}
          </View>

           <List>
            <ListItem button onPress={() => navigate('TutorialsScreen')}>
              <Text>Tutorials</Text>
            </ListItem>
            <ListItem button onPress={() => navigate('FaqScreen')}>
              <Text>FAQs</Text>
            </ListItem>
            <ListItem button onPress={() => navigate('AboutUsScreen')}>
              <Text>About Us</Text>
            </ListItem>
          </List>
        </Content>
      </Container>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  thumbnailStyle: {
    resizeMode: 'contain',
    borderColor: '#ddd',
    borderWidth: 1,
    height: 80,
    width: 80,
  },
  headerViewStyle: {
    padding: 30,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  nameStyle: {
    fontSize: 20,
  },
  buttonStyle: {
    fontSize: 15,
  },
});