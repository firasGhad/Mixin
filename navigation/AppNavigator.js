import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import Home from '../screens/Home';
import MixPlay from '../screens/MixPlay';


const Stack = createStackNavigator();

class AppNavigation extends Component {
  
  render() {
    let initialScreen = this.props.screen || 'Home';
    return (
      <NavigationContainer>
        <Stack.Navigator  initialRouteName={initialScreen}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MixPlay" component={MixPlay} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screen: state.navigatorReducer.lastPage,
  }
}
export default connect(mapStateToProps)(AppNavigation);