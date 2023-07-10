import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LogoScreen from '../screens/LogoScreen';
import AllTasksScreen from '../screens/AllTasksScreen';
import CategoriesScreen from '../screens/CategoriesScreen';

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
        {/* <Stack.Screen
          name="Logo"
          options={{headerShown: false}}
          component={LogoScreen}
        /> */}
        {/* <Stack.Screen
          name="AllTask"
          options={{headerShown: false}}
          component={AllTasksScreen}
        /> */}
        <Stack.Screen
          name="Categories"
          options={{headerShown: false}}
          component={CategoriesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
