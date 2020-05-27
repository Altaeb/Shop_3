import React from 'react';
import Expo from 'expo';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Icon } from 'native-base';
import { StyleSheet, Image, View, TabNavigator, ListView, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import {
    Dialog,
    ProgressDialog,
    ConfirmDialog,
} from 'react-native-simple-dialogs';

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
        auth:{},
        isLoading: false,
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

  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: "612669964630-04vbqsbsvt3mjv0nr7nsa77erika2f9p.apps.googleusercontent.com",
        iosClientId: "612669964630-68qv7vej51qnlkccrdbu7jo2s4v4a1c2.apps.googleusercontent.com",
        androidStandaloneAppClientId: "612669964630-qffrhkqhqjd60m7usj14u6rhv2101hof.apps.googleusercontent.com",
        iosStandaloneAppClientId: "612669964630-79dju4toak9f4svrbp8n8f0ns27o1ldq.apps.googleusercontent.com",
        scopes: ['profile','email'],
        behavior: "web", 
      })

      if (result.type === 'success') {

        return result
      }
      return { cancelled: true }
    } catch (e) {
      return { error: e }
    }
  }

  onLoginPress = async () => {
    const resetActionLogin = NavigationActions.reset({
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

    const result = await this.signInWithGoogleAsync();

    if (result.type === 'success') {  
      
      this.openProgress();

    	fetch('http://api.youaref.biz/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          google_id: result.user.id,
          email: result.user.email,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          auth: responseJson
        }, function() {
          //console.log(this.state.auth);
          if(this.state.auth.registered === true){
            AsyncStorage.setItem("token",this.state.auth.token);
            if(this.state.auth.status === "accepted") {
              this.props.navigation.dispatch(resetActionLogin);
            }
            else {
              this.props.navigation.dispatch(resetActionApprove);
            }
          }
          else {
            this.props.navigation.navigate('SignUpScreen', { id:`${result.user.id}`, name: `${result.user.name}`, email: `${result.user.email}`});
          }
        });
      });  
    }

  }

  render() {
  	const { navigate } = this.props.navigation;

    return (
    	<Container style={styles.container}>
	    	<Content>
		    	<Image
		    	 style={styles.imageStyle}
		         source={require('../assets/images/YOUAREF.png')}
		        />
		       	<TouchableOpacity onPress={this.onLoginPress}> 
		       	 	<Image 
		       	 	 style={styles.buttonImageStyle} 
		       	 	 source={require('../assets/images/google.png')} 
		       	 	/> 
		       	</TouchableOpacity>

            <ProgressDialog
              visible={this.state.showProgress}
              message="Logging in..."
              activityIndicatorSize="large"
              activityIndicatorColor="black"
            />
	    	 </Content>
    	 </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fad30a',
  },
  imageStyle: {
    height: 300,
    width: 200,
    alignSelf:'center',
    marginTop:96,
  },
  buttonImageStyle: {
    height: 50,
    width: 200,
    alignSelf:'center',
    marginTop:24,
  },
});