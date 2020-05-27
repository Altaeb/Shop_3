import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import MenuScreen from '../screens/MenuScreen';
import HomeScreen from '../screens/HomeScreen';
import CampaignsScreen from '../screens/CampaignsScreen';
import AllPlansScreen from '../screens/AllPlansScreen';

export default TabNavigator(
  {
    
    Home: {
      screen: HomeScreen,
    },
    Campaigns: {
      screen: CampaignsScreen,
    },
    AllPlans: {
      screen: AllPlansScreen,
    },
    Menu: {
      screen: MenuScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Campaigns':
            iconName = Platform.OS === 'ios'
              ? `ios-globe${focused ? '' : '-outline'}`
              : 'md-globe';
              break;
          case 'Home':
            iconName = Platform.OS === 'ios'
              ? `ios-home${focused ? '' : '-outline'}`
              : 'md-home';
            break;    
          case 'AllPlans':
            iconName = Platform.OS === 'ios'
              ? `ios-bicycle${focused ? '' : '-outline'}`
              : 'md-bicycle';
            break;
          case 'Menu':
            iconName = Platform.OS === 'ios'
              ? `ios-menu${focused ? '' : '-outline'}`
              : 'md-menu';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
