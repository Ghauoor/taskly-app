import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';

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
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      <Header name="About Us" onPress={() => {}} />
    </LinearGradient>
  </View>
);

export default CustomHeader;
