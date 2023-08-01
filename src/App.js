import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
import {FullStack} from './navigation/AppNavigation';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const App = () => {
  useEffect(() => {
    getToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  const getToken = async () => {
    let token = await messaging().getToken();
    console.log(token);
  };
  return (
    <Provider store={store}>
      <FullStack />
    </Provider>
  );
};

export default App;
