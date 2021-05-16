
import React from 'react';
import { Platform, StatusBar, StyleSheet, View,AsyncStorage ,AppState,Vibration,Image} from 'react-native';
import { SafeAreaProvider,initialWindowMetrics } from 'react-native-safe-area-context';
import { AppLoading } from 'expo';
import {  Asset } from 'expo-asset';
import AppNavigator from './navigation/AppNavigator';
import MainTabNavigator from './navigation/MainTabNavigator';
import { Provider } from 'react-redux';
import store from './store';

export default class App extends React.Component {
  state = {
    appIsReady: false,
  };

  async componentDidMount() {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
  }

  prepareResources = async () => {
    this.setState({ appIsReady: true }, async () => {
      await SplashScreen.hideAsync();
    });
  }

  render() {
    if (!this.state.appIsReady) {
      return null
    }
     return (
       <SafeAreaProvider initialMetrics={initialWindowMetrics}>
       <Provider store = {store}>
       <View style={styles.container}>
         {Platform.OS === 'ios' && <StatusBar backgroundColor="black" barStyle="light-content" />}
         <MainTabNavigator />
       </View>
       </Provider>
       </SafeAreaProvider>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
