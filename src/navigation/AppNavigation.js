import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LogoScreen from '../screens/LogoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Welcome"
          options={{headerShown: false}}
          component={WelcomeScreen}
        /> */}
        <Stack.Screen
          name="Logo"
          options={{headerShown: false}}
          component={LogoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
