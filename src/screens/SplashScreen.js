import React, { Component } from 'react';
import { Container, Header, Content, Thumbnail, Text, Body, Icon } from 'native-base';
import { StyleSheet, Image, View, TabNavigator, ListView, ActivityIndicator, AsyncStorage,Alert,Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import AppIntro from 'react-native-app-intro';
import {
    Dialog,
    ProgressDialog,
    ConfirmDialog,
} from 'react-native-simple-dialogs';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

export default class SplashScreen extends Component {
  
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      checkstatus:{},
    }
  }

  state = {}

    openDialog(show) {
        this.setState({ showDialog: show })
    }

    openConfirm(show) {
        this.setState({ showConfirm: show })
    }

    openProgress() {
        this.setState({ showProgress: true })

        setTimeout(
            () => this.setState({ showProgress: false }),
            2500
        );
    }

    optionYes() {
        this.openConfirm(false);
        // Yes, this is a workaround :(
        // Why? See this https://github.com/facebook/react-native/issues/10471
        setTimeout(() => alert("Yes touched!"), 100);
    }

    optionNo() {
        this.openConfirm(false);
        // Yes, this is a workaround :(
        // Why? See this https://github.com/facebook/react-native/issues/10471
        setTimeout(() => alert("No touched!"), 100);
    }

  componentDidMount = async () => {
    const resetActionMain = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main'})
      ]
    });

    const resetActionApprove = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'approveScreen'})
      ]
    });

    const resetActionLogin = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login'})
      ]
    });

    const resetActionAppIntro = NavigationActions.reset({
      index:0,
      actions:[
        NavigationActions.navigate({ routeName: 'AppIntro'})
      ]
    });

    try {
      let token = await AsyncStorage.getItem('token');
      //console.log(token);
      if(token!== null) {
      fetch('http://api.youaref.biz/checkstatus',{
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
          checkstatus: responseJson
        }, function() {
          if(this.state.checkstatus.status === "accepted"){
          this.props.navigation.dispatch(resetActionMain);  
          }
          else {
           this.props.navigation.dispatch(resetActionApprove); 
          }
          
        });
      })
      .catch((error) => {
        console.error(error);
      });
        

      }
      else {
       //this.props.navigation.dispatch(resetActionLogin);
       this.props.navigation.dispatch(resetActionAppIntro); 
      }
    } 
    catch (error) {
      alert(error);
    }
  }

	render() {	
    const { navigate } = this.props.navigation;
    return (
      <ProgressDialog
              visible={true}
              message="Loading..."
              activityIndicatorSize="large"
              activityIndicatorColor="black"
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fad30a',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },

  imageStyle: {
    height: 200,
    width: 150,
    alignSelf:'center',
    marginTop:110,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    width: 75 * 2,
    height: 63 * 2,
  },
  text: {
    color: '#000',
    fontSize: 30,
  },
  info: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#000',
    fontSize: 30,
    paddingBottom: 20,
  },
  description: {
    color: '#000',
    fontSize: 20,
},
});