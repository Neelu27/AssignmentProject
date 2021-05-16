import React from 'react';
import { Platform ,Image,View,TouchableOpacity} from 'react-native';
import { createBottomTabNavigator,createAppContainer,createSwitchNavigator,withNavigation} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
 import HomeScreen from '../screens/HomeScreen';
 import CreateNewItem from '../screens/CreateNewItem';

import LoginScreen from '../screens/LoginScreen';
const HomeStack = createStackNavigator(
  {
    HomeScreen:HomeScreen,
    CreateNewItem:CreateNewItem
  },
  {
      initialRouteName: 'HomeScreen',
  }
)
HomeStack.navigationOptions = ({ navigation }) => {
      let tabBarVisible = false;
      return {
        tabBarVisible,
      };
};

const LogInStack = createStackNavigator(
  {
    LoginScreen:LoginScreen,
 },
 {
   initialRouteName: 'LoginScreen',
 }
)
LogInStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return {
    tabBarVisible,
  };
};

export default createAppContainer(createSwitchNavigator({
  LogIn:LogInStack,
  Main:HomeStack,
 },{
  initialRouteName:'LogIn'
}
));
