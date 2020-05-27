import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Icon } from 'native-base';
import { StyleSheet, Image, View, TabNavigator, ListView, ActivityIndicator, AsyncStorage, TouchableOpacity, RefreshControl } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class AllPlansScreen extends Component {
  
  static navigationOptions = {
    title: 'Missions',
    headerLeft: null,
    headerStyle: {height: 40}
  }

   constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      plans:{},
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
    fetch('http://api.youaref.biz/plans',{
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
          plans: responseJson.data,
          
        }, function() {
          console.log(this.state.plans)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onButtonPress= async (id) => {
  
  let token = await AsyncStorage.getItem('token');
    
  fetch(`http://api.youaref.biz/likePlan/${id}`, {
    method: 'POST',
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
        res: responseJson
       }, function() {
        if(this.state.res.status === "ok"){
          alert('Liked');
        }
        else if(this.state.res.title === "Already Liked!"){
          alert('Already Liked');
        }
        
    });
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
    
    const { navigate } = this.props.navigation;
    
    return (
      <Container style={styles.container} >
        <Content>
        {this.state.plans.length > 0 ? (
          <List 
            refreshControl={ 
                <RefreshControl 
                  refreshing={this.state.refreshing} 
                  onRefresh={this._onRefresh.bind(this)} 
                  /> 
                } 
            dataArray={this.state.plans}
            renderRow={(plan) =>
            <ListItem onPress={() => navigate('PlansScreen', { id: `${plan.id}`, name: `${plan.name}`, company_id: `${plan.company_id}`})}>
              <Image style={styles.thumbnailStyle} source={{ uri: plan.logo }} />
              {/*<Body>
                <View style={styles.viewTextStyle}>
                  <Text>{plan.name}</Text>
                  <Text note>Rs {plan.price_of_product}</Text>
                </View>
                <View style={styles.viewTextStyle}>
                  <Text note >{plan.difficulty}</Text>
                  <View style={{ left:90 }}>
                  <TouchableOpacity onPress={() => this.onButtonPress(plan.id)}>
                    <EvilIcons name="like" size={30} color="#000000" />
                  </TouchableOpacity>
                  </View>
                  <View style={{ top:5 }}>
                    <Text note> 
                      {plan.likes}
                    </Text>
                  </View>
                </View>
              </Body>*/}
              <View style={styles.view}>
                  <View style={styles.leftinnerview}>
                      <View style={styles.leftmostinnerview}>
                        <Text>{plan.name}</Text>
                      </View>
                      <View style={styles.leftmostinnerview}>
                        <Text note>{plan.difficulty}</Text>
                      </View>
                  </View>
                  <View style={styles.rightinnerview}>
                      
                    <View style={styles.mostinnerview}>
                      <Text note>
                        Rs {plan.price_of_product} 
                      </Text>
                    </View>
                      
                    <View style={styles.mostinnerview}>
                      <TouchableOpacity onPress={() => this.onButtonPress(plan.id)}>
                        <EvilIcons name="like" size={30} color="#000000" />
                      </TouchableOpacity>
                      <Text note> 
                        {plan.likes}
                      </Text>
                    </View>
                  </View>
              </View>
            </ListItem>
          }>
          </List>
          ):
          ( 
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Text note style={{fontSize: 20}}> No missions assigned yet ! </Text>
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
  view: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rightinnerview: {
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    leftinnerview: {
      paddingLeft:8,
      flexDirection: "column",
    },
    mostinnerview: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    leftmostinnerview: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
});