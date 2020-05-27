import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Separator, Input, Item } from 'native-base';
import { ScrollView, StyleSheet, View, Image, TextInput, Button, AsyncStorage,TabNavigator, ActivityIndicator, RefreshControl} from 'react-native';

export default class PlanTabDiscuss extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.sampleProps = this.props;
    this.state = {
      isLoading: true,
      discuss:{
      },
      question:'',
      res:{},
      refreshing: false,
    };
  }

  _onRefresh() { 
    console.log("refresh1");
    this.setState({refreshing: true}); 
    setTimeout(() => {
      this.componentDidMount();
      this.setState({
        refreshing: false
      }); 
    },3000); 

    console.log("refresh2");
  }

  componentDidMount = async () => {
    let token = await AsyncStorage.getItem('token');
    
    fetch(`http://api.youaref.biz/plan/${this.sampleProps.sampleProps}`,
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
          discuss: responseJson.data.discussions.data
          
        }, function() {
          console.log(this.state.plans)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onButtonPress= async () => {
  let token = await AsyncStorage.getItem('token');   
  fetch(`http://api.youaref.biz/discussPlanQuestion/${this.sampleProps.sampleProps}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Host': 'api.youaref.biz'
    },
    body: JSON.stringify({
      question: this.state.question,
    })

  })
  .then((response) => response.json())
  .then((responseJson) => {
      this.setState({
        res: responseJson
       }, function() {
        if(this.state.res.status === "ok"){
          this.refs.questionInput.setNativeProps({text:''})
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

    return (
      <Container style={styles.container} >
        <Content>
          <View>
            <List 
              refreshControl={ 
                <RefreshControl 
                  refreshing={this.state.refreshing} 
                  onRefresh={this._onRefresh.bind(this)} 
                  title="Loading..."
                /> 
              } 
              dataArray={this.state.discuss}
              renderRow={(discussions) =>
                <ListItem onPress={() => this.props.navigation.navigate('SingleDiscussion',{ id: `${discussions.id}`, question: `${discussions.question}`})}>
                  <Body> 
                    <View style={styles.viewTextStyle}>
                      <Text>{discussions.question}</Text>
                    </View>
                  </Body>
                </ListItem>
              }>
            </List>  
          </View>
          
          <View style={ {flex:1, flexDirection:'row', alignSelf:'stretch' ,position:'relative',paddingTop: 15,paddingLeft:5} }>
            <View style={ { flex:3,height:60, alignSelf:'stretch', position:'relative' } }>
              <Item regular>
                <Input 
                  ref='questionInput'
                  placeholder='Ask a question' 
                  onChangeText={(question) => this.setState({question})}
                />
              </Item>
            </View>
            <View style={{ flex:1, alignSelf:'stretch',position:'relative',paddingTop:9,paddingLeft:10}}> 
              <Button
                onPress={this.onButtonPress}
                title="Submit"
                color="#000000"
                accessibilityLabel="Learn more about this purple button"
              />
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
  viewTextStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  viewTextBoxStyle: {
    flex:1,
    flexDirection: 'row'
  }

});