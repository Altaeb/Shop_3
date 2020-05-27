import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Separator} from 'native-base';
import { ScrollView, StyleSheet, View, Image, TextInput, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

export default class BankDetailsScreen extends Component {
  
  static navigationOptions = {
    title: 'Bank Details',
    headerStyle: {height: 40}
  }

  constructor(props) {
    super(props);
    this.state = { 
                    holdername: '',
                    bankname: '',
                    ifsccode: '',
                    accountnumber: '',
                    pannumber: '',
                    res:{} 
                 };
  this.onButtonPress = this.onButtonPress.bind(this);               
  }

  onButtonPress= async () => {
  
  let token = await AsyncStorage.getItem('token');
    
  fetch('http://api.youaref.biz/bank_detail', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Host': 'api.youaref.biz'
    },
    body: JSON.stringify({
      holder_name: this.state.holdername,
      bank_name: this.state.bankname,
      ifsc: this.state.ifsccode,
      account_number: this.state.accountnumber,
      pan_number: this.state.pannumber,
    })

  })
  .then((response) => response.json())
  .then((responseJson) => {
      this.setState({
        res: responseJson
       }, function() {
        console.log(this.state.res);
        if(this.state.res.status === "ok"){
          alert('Bank Details Added');
          this.props.navigation.navigate('ProfileScreen');
        }
        else if(this.state.res.title === "Already added!"){
          alert('Error, Bank Details already Added');
          this.props.navigation.navigate('ProfileScreen');
        }
     
    });
  }); 
  }


  render() {
    
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container} >
        <Content>
          <View style={styles.textInputViewStyle}>
            <TextInput
            style={styles.textInputStyle}
            onChangeText={(holdername) => this.setState({holdername})}
            value={this.state.holdername}
            placeholder = 'Account Holder Name'
            />
            <TextInput
            style={styles.textInputStyle}
            onChangeText={(bankname) => this.setState({bankname})}
            value={this.state.bankname}
            placeholder = 'Bank Name'reload each time api is called in react native
            />
            <TextInput
            style={styles.textInputStyle}
            onChangeText={(ifsccode) => this.setState({ifsccode})}
            value={this.state.ifsccode}
            placeholder = 'IFSC Code'
            />
            <TextInput
            style={styles.textInputStyle}
            onChangeText={(accountnumber) => this.setState({accountnumber})}
            value={this.state.accountnumber}
            placeholder = 'Account Number'
            />
            <TextInput
            style={styles.textInputStyle}
            onChangeText={(pannumber) => this.setState({pannumber})}
            value={this.state.pannumber}
            placeholder = 'Pan Number'
            />
          </View>

          <Button 
              title="SAVE"
              color='white'
              backgroundColor='black'
              fontWeight='bold'
              borderRadius={10}
              buttonStyle = {styles.signupButton}
              onPress={this.onButtonPress}
            />

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
  Button: {
    marginTop:5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  ButtonText: {
    fontSize: 18,
  },
  textInputViewStyle: {
    padding:20,
  },
  textInputStyle: {
    fontSize: 18,
    marginBottom:12,
    height:50,
    fontWeight: '100'
  },
  signupButton: {
    marginTop: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
});