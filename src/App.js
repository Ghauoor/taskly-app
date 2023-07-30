import React from 'react';
import 'react-native-gesture-handler';
import {FullStack} from './navigation/AppNavigation';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <FullStack />
    </Provider>
  );
};

export default App;
