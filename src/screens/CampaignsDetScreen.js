import React, { Component } from 'react';
import { Container, Header, Content, List, Icon, ListItem, Thumbnail, Body, Card, CardItem, Text } from 'native-base';
import { View, Image, StyleSheet, AsyncStorage, ActivityIndicator, TouchableOpacity, RefreshControl} from 'react-native';
import StarRating from 'react-native-star-rating';
import { Button } from 'react-native-elements';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class CampaignsDetScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
    
  })

constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      isLoading: true,
      company:{},
      plans:{},
      res:{},
      refreshing: false,
    };
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
    fetch(`http://api.youaref.biz/company/${this.props.navigation.state.params.id}`,
    {
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
          company: responseJson.data,
          plans: responseJson.data.plans.data
        }, function() {
          
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onStarRatingPress(rating) {
  this.setState({
    starCount: rating
  });

}

  onsubmitrating = async () => {
  let token = await AsyncStorage.getItem('token');
    
    fetch(`http://api.youaref.biz/ratecompany/${this.props.navigation.state.params.id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Host': 'api.youaref.biz'
    },
    body: JSON.stringify({
      rating: this.state.starCount,
      
    })

  })
  .then((response) => response.json())
  .then((responseJson) => {
      this.setState({
        res: responseJson
       }, function() {
          if(this.state.res.status === "ok"){
            alert('Rating Submitted');
          }
          else if(this.state.res.title === "Already Rated!") {
           alert('You Have already rated'); 
          }
    });
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

    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    var company_logo = this.state.company.logo;

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Container style={styles.container}>
        <Content>
          <Image style={styles.image}  borderRadius={10} source={{uri: company_logo}} />
          <Text style={styles.thumbnailText}>{params.name}</Text>

          <View style={styles.viewSubHeadStyle}>
            <Text note>{this.state.company.enrolled} enrolled | </Text>
            <Text note>{this.state.company.total_plans} plans | </Text>
            <Text note>{this.state.company.rating}/5.0</Text>
          </View>

          <View style={styles.aboutViewStyle}>
            <Text style={styles.aboutTextStyle} note>{this.state.company.about}</Text>
          </View>

          <Text note style={{textAlign:'center',paddingTop:10}}>Rate this company</Text>

          <View style={styles.ratingViewStyle}>
            <View style={styles.ratingStyle}>
              <StarRating
                disabled={false}
                maxStars={5}
                starSize={18}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>
            <TouchableOpacity onPress={this.onsubmitrating}>
              <Text style={{ fontWeight:'bold', paddingTop:10}}>Submit</Text>
            </TouchableOpacity>
          </View>
          
          <List dataArray={this.state.plans}
            renderRow={(plan) =>
            <ListItem onPress={() => navigate('PlansScreen', { id: `${plan.id}`, name: `${plan.name}`})}>
              <Image style={styles.thumbnailStyle} source={{ uri: plan.logo }} />
              {/*<Body>
                <View style={styles.viewTextStyle}>
                  <Text>{plan.name}</Text>
                  <Text note>Rs {plan.price_of_product}</Text>
                </View>
                <View style={styles.viewTextStyle}>
                  <Text note >{plan.difficulty}</Text>
                  <View style={{ left:130 }}>
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
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },

  image: {
  alignSelf: 'center', 
  marginTop: 20,
  marginBottom: 10,  
  resizeMode: 'contain',
  borderColor: '#ddd',
  borderWidth: 1,
  height: 100,
  width: 100,
  },

  thumbnailText: {
    fontSize: 18,
    alignSelf: 'center',
  },

  viewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ratingStyle: {
    width:130,
  },
  ratingViewStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom:15,
    paddingTop:8,
    alignItems: 'center',
  },

  aboutViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft:20,
    paddingRight:20,
  },
  aboutTextStyle: {
    textAlign: 'justify',
    fontWeight: '100',
    lineHeight: 22
  },
  viewTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewSubHeadStyle: {
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
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