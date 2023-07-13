import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WelcomeScreen from '../screens/WelcomeScreen';
import LogoScreen from '../screens/LogoScreen';
import AllTasksScreen from '../screens/AllTasksScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CalenderScreen from '../screens/CalenderScreen';
import SettingScreen from '../screens/AboutUsScreen';
import Header from '../components/Header';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AboutUsScreen from '../screens/AboutUsScreen';
import SettingSceen from '../screens/SettingSceen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const CustomHeader = ({navigation}) => (
    <View
      style={{
        overflow: 'hidden',
        height: 80,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
      }}>
      <LinearGradient
        colors={['#A100FE', '#F300F0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <Header name="About Us" onPress={() => {}} />
      </LinearGradient>
    </View>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({navigation, route}) => ({
          header:
            route.name === 'AboutUs'
              ? () => <CustomHeader navigation={navigation} />
              : null,
        })}>
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
        {/* <Stack.Screen
          name="Categories"
          options={{headerShown: false}}
          component={CategoriesScreen}
        /> */}
        {/* <Stack.Screen
          name="Calender"
          options={{ headerShown: false }}
          component={CalenderScreen}
        /> */}
        {/* <Stack.Screen name="AboutUs" component={AboutUsScreen} /> */}
        {/* <Stack.Screen
          name="Settings"
          options={{headerShown: false}}
          component={SettingSceen}
        /> */}
        {/* <Stack.Screen
          name="CreateTask"
          options={{headerShown: false}}
          component={CreateTaskScreen}
        /> */}
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
