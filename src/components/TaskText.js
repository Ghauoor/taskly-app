import * as React from 'react';
import {Surface, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TaskText = () => (
  <LinearGradient
    colors={['#9C00FF', '#BB00FF']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    style={style.linearGradient}>
    <Text style={style.text}>3</Text>
  </LinearGradient>
);

const style = StyleSheet.create({
  linearGradient: {
    padding: 8,
    height: 35,
    width: 35,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
export default TaskText;
