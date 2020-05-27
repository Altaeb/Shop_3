import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import CampaignsDetScreen from '../screens/CampaignsDetScreen';
import PlansScreen from '../screens/PlansScreen';
import DealsDetScreen from '../screens/DealsDetScreen';
import AllPlansScreen from '../screens/AllPlansScreen';
import DealsScreen from '../screens/DealsScreen';
import CampaignsScreen from '../screens/CampaignsScreen';
import TrainingScreen from '../screens/TrainingScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BankDetailsScreen from '../screens/BankDetailsScreen';
import FaqScreen from '../screens/FaqScreen';
import SingleDiscussion from '../screens/SingleDiscussion';
import SignUpScreen from '../screens/SignUpScreen';
import TutorialsScreen from '../screens/TutorialsScreen';
import approveScreen from '../screens/approveScreen';
import ChatScreen from '../screens/ChatScreen';
import SplashScreen from '../screens/SplashScreen';
import AppIntroScreen from '../screens/AppIntroScreen';
import AboutUsScreen from '../screens/AboutUsScreen';

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
    AppIntro: {
      screen: AppIntroScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Main: {
      screen: MainTabNavigator,
    },
    CampaignsDetScreen: {
      screen: CampaignsDetScreen,
    },
    PlansScreen: {
      screen: PlansScreen,
    },
    DealsDetScreen: {
      screen: DealsDetScreen,
    },
    AllPlansScreen: {
      screen: AllPlansScreen,
    },
    CampaignsScreen: {
      screen: CampaignsScreen,
    },
    DealsScreen: {
      screen: DealsScreen,
    },
    TrainingScreen: {
      screen: TrainingScreen,
    },
    ProfileScreen: {
      screen: ProfileScreen,
    },
    BankDetailsScreen: {
      screen: BankDetailsScreen,
    },
    FaqScreen: {
      screen: FaqScreen,
    },
    SingleDiscussion: {
      screen: SingleDiscussion,
    },
    SignUpScreen: {
      screen: SignUpScreen,
    },
    TutorialsScreen: {
      screen: TutorialsScreen, 
    },
    approveScreen: {
      screen: approveScreen, 
    },
    ChatScreen: {
      screen: ChatScreen,
    },
    AboutUsScreen: {
      screen: AboutUsScreen,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}