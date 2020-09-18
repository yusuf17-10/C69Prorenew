import * as React from 'react';
import ScanScreen from './screens/ScanScreen';
import { createAppContainer} from 'react-navigation'; 
import {createBottomTabNavigator} from 'react-navigation-tabs';

export default class App extends React.Component {
  render() {
    return (

      <AppContainer/>

    );
  }
}

const TabNavigator = createBottomTabNavigator({
        scan:{screen:ScanScreen}
})

const AppContainer=createAppContainer(TabNavigator);
