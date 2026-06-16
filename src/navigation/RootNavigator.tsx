import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomTabBar} from './CustomTabBar';
import {RootTabParamList} from './types';
import {HomeScreen} from '../screens/HomeScreen';
import {PlayerScreen} from '../screens/PlayerScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Player" component={PlayerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
