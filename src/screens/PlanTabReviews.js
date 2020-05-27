import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Separator, Input, Item, Label, Form } from 'native-base';
import { ScrollView, StyleSheet, View, Image, TextInput, AsyncStorage, ActivityIndicator, RefreshControl } from 'react-native';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements';

export default class PlanTabReviews extends Component {

   constructor(props) {
    super(props);
    this.sampleProps = this.props;
    this.state = {
      isLoading: true,
      reviews:{},
      title:'',
      message:'',
      res:{},
      refreshing: false,
      visibleModal: null,
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
          reviews: responseJson.data.reviews.data,
        }, function() {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderModalContent = () => (
    <View style={ styles.modalContentLogin }>
      <ScrollView style={{flex:1, flexDirection:'column', paddingTop:0, paddingLeft:0, paddingRight:0, paddingBottom:0 }}>
        <View style={{ flex:1, flexDirection:'column', paddingTop:10, paddingLeft:0, paddingRight:0, paddingBottom:0 }}>
          <KeyboardAvoidingView
            style={ styles.modalContentLogin }
            behavior="padding">
            <Form>
              <Item stackedLabel>
                <Label style={{ fontWeight:'bold', fontSize:13, color:'#555555' }}>Title</Label>
                <Input
                  ref='titleInput'
                  onChangeText={(title) => this.setState({title})}
                />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight:'bold', fontSize:13, color:'#555555' }}>Description</Label>
                <Input 
                  ref='descriptionInput'
                  multiline={true}
                  numberOfLines={5}
                  style={{ height: 80}}
                  onChangeText={(message) => this.setState({message})}
                />
              </Item>
            </Form>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      <Button
        raised
        large
        containerViewStyle={{ marginTop:20, marginLeft:0, marginRight:0 }}
        buttonStyle={{ backgroundColor: '#000000'}}
        textStyle={{textAlign: 'center'}}
        fontWeight={'bold'}
        title={`SUBMIT REVIEW`}
        onPress={() => {this.onButtonPress()}}
      />
    </View>
  )

  onButtonPress= async () => {
    let token = await AsyncStorage.getItem('token');
    fetch(`http://api.youaref.biz/reviewPlan/${this.sampleProps.sampleProps}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Host': 'api.youaref.biz'
      },
      body: JSON.stringify({
        title: this.state.title,
        message: this.state.message,
      })

    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          res: responseJson,
          visibleModal: null,
         }, function() {
          if(this.state.res.status === "ok"){
            setTimeout( () => {
              alert("Submitted");
            }, 500);
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
      <Container style={styles.container}>
      <ScrollView style={styles.container}>
        <View  style={styles.reviewButtonStyle}>
          <Button
            color='white'
            backgroundColor='black'
            onPress={() => this.setState({ visibleModal: 5 })}
            title="ADD A REVIEW"
          />
        </View>
          <View>
            <List 
              refreshControl={ 
                <RefreshControl 
                  refreshing={this.state.refreshing} 
                  onRefresh={this._onRefresh.bind(this)} 
                  title="Loading..."
                  /> 
              } 
              dataArray = {this.state.reviews}
              renderRow = {(review) =>
                <ListItem>
                  <Body> 
                    <View style={styles.viewTextStyle}>
                      <Text>{review.name}</Text>
                      <Text note>{review.message}</Text>
                      <View style={styles.nameTextStyle}>
                        <Text note>By {review.user_name}</Text>
                      </View>
                    </View>
                  </Body>
                </ListItem>
              }>
            </List>  
          </View> 
            {/*<PopupDialog dialogTitle={<DialogTitle title="Add review" />} width={330} height={250} ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
              <View>
                  <Item>
                    <Input 
                      placeholder='Title'
                      ref='titleInput'
                      onChangeText={(title) => this.setState({title})}
                    />
                  </Item>
                  <Item>
                    <Input 
                      placeholder='Description'
                      ref='descriptionInput'
                      multiline={true}
                      numberOfLines={5}
                      style={{ height: 80}}
                      onChangeText={(message) => this.setState({message})}
                      />
                  </Item>
                  <View  style={{ top:30,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Button
                      title="SUBMIT"
                      onPress={this.onButtonPress}
                      color="#000000"
                    />
                  </View>
                </View>
              
            </PopupDialog>*/}
          <Modal 
            isVisible={ this.state.visibleModal === 5 } 
            style={ styles.bottomModalLogin } 
            backdropOpacity={0.5} 
            onBackButtonPress={() => this.setState({ visibleModal: null })}
            onBackdropPress={() => this.setState({ visibleModal: null })}
            >
            {this._renderModalContent()}
          </Modal>
      </ScrollView>
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
  },
  nameTextStyle:{
    paddingTop: 8,
  },
  reviewButtonStyle:{
    flexDirection:'row',
    paddingTop: 20,
    justifyContent:'center',
  },
  bottomModalLogin: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContentLogin: {
    flex: 0.8,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});