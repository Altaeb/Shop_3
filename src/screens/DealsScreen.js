import React from 'react';
import { StyleSheet,View } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Your Deals',
  };

  render() {
    const { navigate } = this.props.navigation;
    var deals = [{"name":"Amazon","status":"Approved","buyer":"Anirudh Khandelwal","date":"28th August 2017"},
                {"name":"Snapdeal","status":"Rejected","buyer":"Anshul Mehta","date":"28th August 2017"},
                {"name":"MOD","status":"Floating","buyer":"Alok Singh","date":"28th August 2017"}];
    return (
      <Container style={styles.container}>
        <Content>
          <List dataArray={deals}
            renderRow={(deals) =>
            <ListItem onPress={() => navigate('DealsDetScreen', { name: `${deals.name}`})}>
              <Body>
                <View style={{ flex:1,flexDirection: 'row',alignItems:'flex-start',justifyContent:'flex-start' }}>
                  <Text> {deals.name} </Text> 
                  <Text style={{backgroundColor:'#696969',color:'#ffffff'}}>  {deals.status} </Text>
                </View>
                <View style={{ flex:1,flexDirection: 'row',alignItems:'flex-start',justifyContent:'flex-start' }}>
                  <Text style={{ fontSize: 12,color: '#007bb6' }}> Buyer: </Text> 
                  <Text style={{ fontSize: 12,color: '#007bb6' }}>  {deals.buyer} </Text>
                </View>
                <View style={{ flex:1,flexDirection: 'row',alignItems:'flex-start',justifyContent:'flex-start' }}>
                  <Text style={{ fontSize: 12,color: '#007bb6' }}> Date: </Text> 
                  <Text style={{ fontSize: 12,color: '#007bb6' }}> {deals.date} </Text>
                </View>
              </Body>
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
  status: {

  }
});


