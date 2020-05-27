import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';
import { StyleSheet, Image, View, ActivityIndicator, AsyncStorage, RefreshControl } from 'react-native';

export default class CampaignsScreen extends Component {
  
  static navigationOptions = {
    title: 'Brands',
    headerLeft: null,
    headerStyle: {height: 40}
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      companies:{},
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
    
    fetch('http://api.youaref.biz/companies',{
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
          companies: responseJson.data,
          
        }, function() {
          console.log(this.state.companies)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    //var company_logo = this.state.companies.logo;

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
        {
          this.state.companies.length > 0 ? (
          <List 
            refreshControl={ 
                <RefreshControl 
                  refreshing={this.state.refreshing} 
                  onRefresh={this._onRefresh.bind(this)} 
                  /> 
                } 
            dataArray={this.state.companies}
            renderRow={(camp) =>
            <ListItem onPress={() => navigate('CampaignsDetScreen', { id: `${camp.company_id}`, name: `${camp.name}`})}>
              <Image style={styles.thumbnailStyle} source={{ uri: camp.logo }} />
              <Body>
                <View style={styles.viewTextStyle}>
                  <Text>{camp.name}</Text>
                  <Text note>{camp.rating}/5.0</Text>
                </View>
                <View style={styles.viewTextStyle}>
                  <Text note>{camp.type}</Text>
                  <Text note>{camp.enrolled} Enrolled</Text>
                </View>
              </Body>
            </ListItem>
          }>
          </List>
          ):
          (
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Text note style={{fontSize: 20}}> No brands assigned yet ! </Text>
            </View>
          )
        }
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
    borderColor: '#ddd',
    borderWidth: 1,
    height: 60,
    width: 60,
  },
  viewTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});