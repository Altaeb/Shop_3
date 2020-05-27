import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Body, Separator, Button } from 'native-base';
import { ScrollView, StyleSheet, View, Image, Text, TextInput } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class TutorialsScreen extends Component {
  
  static navigationOptions = {
    title: 'Tutorials',
    headerStyle: {height: 40}
  };

  render() {
    
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container} >
        <Content>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <Text note style={{fontSize: 20}}> No tutorials added ! </Text>
        </View>

        {/*<List>
            <ListItem>
              <Body>
                <Text style={styles.questionStyle} > How to start ?</Text>
                <View style={{ flexDirection:'row',  }}>
                  <EvilIcons name="sc-youtube" size={50} color="#000000" />
                  <Hyperlink linkDefault={ true }>
                  <Text style={styles.linkStyle} > www.youtube.com/youaref/1 </Text>
                  </Hyperlink>
                </View>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={styles.questionStyle}>What all skills are required ?</Text>
                <View style={{ flexDirection:'row',  }}>
                  <EvilIcons name="sc-youtube" size={50} color="#000000" />
                  <Hyperlink linkDefault={ true }>
                  <Text style={styles.linkStyle} > www.youtube.com/youaref/2 </Text>
                  </Hyperlink>
                </View>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={styles.questionStyle}>How to I earn ?</Text>
                <View style={{ flexDirection:'row',  }}>
                  <EvilIcons name="sc-youtube" size={50} color="#000000" />
                  <Hyperlink linkDefault={ true }>
                  <Text style={styles.linkStyle} > www.youtube.com/youaref/3 </Text>
                  </Hyperlink>
                </View>
              </Body>  
            </ListItem>
          </List>*/}

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  questionStyle: {
    fontSize:18
  },
  linkStyle: {
    fontSize:16,
    color: '#2980b9',
    paddingTop: 10,
  },
});