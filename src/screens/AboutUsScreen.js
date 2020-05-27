import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Body, Separator, Button } from 'native-base';
import { ScrollView, StyleSheet, View, Image, Text, TextInput } from 'react-native';
import ReadMore from '@expo/react-native-read-more-text';
import { RegularText, BoldText } from '../components/StyledText';

import Colors from '../constants/Colors';

export default class AboutUsScreen extends Component {
  
  static navigationOptions = {
    title: 'About Us',
    headerStyle: {height: 40}
  };

  _renderTruncatedFooter = handlePress => {
    return (
      <RegularText
        style={{ color: Colors.tintColor, marginTop: 5 }}
        onPress={handlePress}>
        Read more
      </RegularText>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <RegularText
        style={{ color: Colors.tintColor, marginTop: 5 }}
        onPress={handlePress}>
        Show less
      </RegularText>
    );
  };

  render() {
    
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container} >
        <Content>
          <Body>
            <Image
           style={styles.imageStyle}
             source={require('../assets/images/AboutUs.png')}
            />
          </Body>
          
          <View style={styles.cardLabel}>
          <BoldText style={styles.cardLabelText}>
            About Us
          </BoldText>
          </View>
          
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}>
              <RegularText style={styles.cardText}>Simply Put, we at YouAreF are the game changers in the era of marketing. Our tactics is way different from traditional marketing, we identify the influencers to talk about the brands. The way we depict the story and produce content, it makes brand go viral and the role of Gabby/Artist/Influencer/Journalist/Salesman comes in. {"\n"}</RegularText>
            </ReadMore>
          </View>
        </View>

        <View style={styles.cardLabel}>
          <BoldText style={styles.cardLabelText}>
            Get paid INR 100/Hour & More
          </BoldText>
          </View>
          
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}>
              <RegularText style={styles.cardText}>If you’re associated to work with us you, it includes tactics such as evangelist, viral, grassroots and seeding,
               to name a few. Although these may seem like buzzwords, each is a distinct tactic that has its proper time and place.
               They are often used together to create great stories about the brand that you have to share with with your social circle over an extended period of time.{"\n"}{"\n"}
               If you’re associated with us as an Artist, your job is to help startups spread the right message with power content & artwork.{"\n"}{"\n"}
               All word of mouth techniques are based on the concepts of customer satisfaction, two-way dialog and transparent communications. The basic elements are:{"\n"}{"\n"}
               Identifying the people most likely to share their opinions{"\n"}
               Studying how, where and when opinions are being shared.{"\n"}
               Providing the tools to make it easier to share information.{"\n"}
               Listening and responding to people that have good, bad or indifferent things to say.</RegularText>
            </ReadMore>
          </View>
        </View>

        <View style={styles.cardLabel}>
          <BoldText style={styles.cardLabelText}>
            Conventional Marketing
          </BoldText>
          </View>
          
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}>
              <RegularText style={styles.cardText}>
              Broadcast{"\n"}
              Push{"\n"}
              Company scheduled{"\n"}
              Lag time{"\n"}
              Company to audience{"\n"}
              Expected{"\n"}
              </RegularText>
            </ReadMore>
          </View>
        </View>

        <View style={styles.cardLabel}>
          <BoldText style={styles.cardLabelText}>
            YouAreF Marketing
          </BoldText>
          </View>
          
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}>
              <RegularText style={styles.cardText}>
              Narrowcast{"\n"}
              Pull{"\n"}
              Consumer requested{"\n"}
              Real time{"\n"}
              Peer to peer{"\n"}
              Interesting{"\n"}
              </RegularText>
            </ReadMore>
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
  questionStyle: {
    fontWeight:'bold',
    fontSize:18
  },
  answerStyle: {
    fontSize:16
  },
  imageStyle: {
    height: 200,
    width: 150,
    alignSelf:'center',
    marginTop:10,
  },
  card: {
    backgroundColor: '#fff',
  },
  cardBody: {
    paddingTop:0,
    paddingBottom:6,
    paddingHorizontal: 12,
  },
  cardText: {
    fontSize: 18,
    color: '#424242',
  },
  cardLabel: {
    paddingHorizontal:12,
    paddingTop:6,
    paddingBottom:6,
  },
  cardLabelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#000000',
  },
});