import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WelcomeScreen from '../screens/WelcomeScreen';
import LogoScreen from '../screens/LogoScreen';
import AllTasksScreen from '../screens/AllTasksScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CalenderScreen from '../screens/CalenderScreen';
import SettingScreen from '../screens/AboutUsScreen';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AboutUsScreen from '../screens/AboutUsScreen';
import SettingSceen from '../screens/SettingSceen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import HomeScreen from '../screens/HomeScreen';
import Header from '../components/Header';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import CustomHeader from '../components/CustomHeader';
import CustomDrawer from '../components/CustomDrawer';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/slices/user';
import {onAuthStateChanged, auth} from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateTask"
        options={{headerShown: false}}
        component={CreateTaskScreen}
      />
      <Stack.Screen
        name="TaskDetailsScreen"
        component={TaskDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoriesScreen"
        options={{
          headerShown: false,
        }}
        component={CategoriesScreen}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Logo"
        options={{headerShown: false}}
        component={LogoScreen}
      />

      <Stack.Screen
        name="WelcomeScreen"
        options={{headerShown: false}}
        component={WelcomeScreen}
      />
    </Stack.Navigator>
  );
}

function AppNavigation() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          drawerActiveBackgroundColor: 'transparent',
          headerShown: false,
          drawerLabelStyle: {
            marginLeft: -10,
            color: '#fff',
            fontSize: 16,
            fontFamily: 'Sofia Pro',
          },
          drawerIcon: () => <Feather name="home" size={25} color={'#fff'} />,
        }}
        component={MainStack}
      />
      {/* <Drawer.Screen
          name="Welcome"
          options={{headerShown: false}}
          component={WelcomeScreen}
        /> */}
      {/* <Drawer.Screen
          name="Logo"
          options={{headerShown: false}}
          component={LogoScreen}
        /> */}
      <Drawer.Screen
        name="Categories"
        options={{
          headerShown: false,
          drawerActiveBackgroundColor: 'transparent',
          drawerLabelStyle: {
            marginLeft: -10,
            color: '#fff',
            fontSize: 16,
            fontFamily: 'Sofia Pro',
          },
          drawerIcon: () => (
            <Image
              source={require('../../assets/images/categories.png')}
              style={{height: 22, width: 22}}
            />
          ),
        }}
        component={CategoriesScreen}
      />
      <Drawer.Screen
        name="Calender"
        options={{
          headerShown: false,
          drawerActiveBackgroundColor: 'transparent',
          drawerLabelStyle: {
            marginLeft: -10,
            color: '#fff',
            fontSize: 16,
            fontFamily: 'Sofia Pro',
          },
          drawerIcon: () => (
            <Image
              source={require('../../assets/images/calender.png')}
              style={{height: 22, width: 22, resizeMode: 'contain'}}
            />
          ),
        }}
        component={CalenderScreen}
      />
      <Drawer.Screen
        name="All Task"
        options={{
          headerShown: false,
          drawerActiveBackgroundColor: 'transparent',
          drawerLabelStyle: {
            marginLeft: -10,
            color: '#fff',
            fontSize: 16,
            fontFamily: 'Sofia Pro',
          },
          drawerIcon: () => (
            <Image
              source={require('../../assets/images/all-task.png')}
              style={{height: 22, width: 22, resizeMode: 'contain'}}
            />
          ),
        }}
        component={AllTasksScreen}
      />
      {/* <Drawer.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={{
            header: () => {
              return <CustomHeader />;
            },
          }}
        /> */}
      <Drawer.Screen
        name="Settings"
        options={{
          drawerActiveBackgroundColor: 'transparent',
          headerShown: false,
          drawerLabelStyle: {
            marginLeft: -10,
            color: '#fff',
            fontSize: 16,
            fontFamily: 'Sofia Pro',
          },
          drawerIcon: () => (
            <Feather name="settings" size={25} color={'#fff'} />
          ),
        }}
        component={SettingSceen}
      />
    </Drawer.Navigator>
  );
}
export function FullStack() {
  const user = useSelector(state => state.userState.user);
  console.log("I'm user", user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="app"
            options={{headerShown: false}}
            component={AppNavigation}
          />
        ) : (
          <Stack.Screen
            name="auth"
            options={{headerShown: false}}
            component={AuthStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
