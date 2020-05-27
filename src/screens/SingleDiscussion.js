import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Separator, Input, Item } from 'native-base';
import { ScrollView, StyleSheet, View, Image, TextInput, Button, AsyncStorage, ActivityIndicator, RefreshControl } from 'react-native';

export default class SingleDiscussion extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:`${navigation.state.params.question}`,
    
  })

  constructor(props) {
    super(props);
    this.sampleProps = this.props;
    this.state = {
      isLoading: true,
      answers:{
      },
      comment:'',
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
    console.log("1123");
    console.log(this.props.navigation.state.params.id);
    fetch(`http://api.youaref.biz/discussionAnswer/${this.props.navigation.state.params.id}`,
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
          answers: responseJson.data,
          
        }, function() {
          console.log(this.state.plans)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onButtonPress= async () => {
    console.log("ButtonPressed");
    console.log(this.props.navigation.state.params.id);
    console.log(this.state.comment);
  let token = await AsyncStorage.getItem('token');   
  fetch(`http://api.youaref.biz/discussPlanAnswer/${this.props.navigation.state.params.id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Host': 'api.youaref.biz'
    },
    body: JSON.stringify({
      answer: this.state.comment,
    })

  })
  .then((response) => response.json())
  .then((responseJson) => {
      this.setState({
        res: responseJson
       }, function() {
          console.log(this.state.res);
        if(this.state.res.status === "ok"){
          console.log("ok");
          this.refs.commentInput.setNativeProps({text:''})
        }        
    });
  }); 
  }

  _onRefresh() {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
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
                dataArray={this.state.answers}
                renderRow={(answer) =>
                <ListItem>
                  <Body> 
                    <View style={styles.viewTextStyle}>
                      <Text>{answer.answer}</Text>
                    </View>
                    <View style={styles.viewTextStyle}>
                      <Text note>By {answer.user_name}</Text>
                    </View>
                  </Body>
                </ListItem>
              }>
            </List>  
          </View>
          
          <View style={ {flex:1, flexDirection:'row', alignSelf:'stretch' ,position:'relative',paddingTop: 15,paddingLeft:5} }>
            <View style={{ flex:4,height:60, alignSelf:'stretch', position:'relative' }}>
              <Item regular>
                <Input 
                  ref='commentInput'
                  placeholder='Your comment here'
                  onChangeText={(comment) => this.setState({comment})} 
                />
              </Item>
            </View>
            <View style={{ flex:2, alignSelf:'stretch',position:'relative',paddingTop:9,paddingLeft:10}}> 
              <Button
                onPress={this.onButtonPress}
                title="Comment"
                color="#000000"
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