import * as React from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const TASK_TEXT_SIZE = Math.min(width, height) * 0.03; // Adjust the factor to control the text size

const TaskText = ({numberOfTasks}) => (
  <LinearGradient
    colors={['#9C00FF', '#BB00FF']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    style={styles.linearGradient}>
    <Text style={[styles.text, {fontSize: TASK_TEXT_SIZE}]}>
      {numberOfTasks}
    </Text>
  </LinearGradient>
);

const styles = StyleSheet.create({
  linearGradient: {
    padding: 8,
    height: 0.09 * Math.min(width, height),
    width: 0.09 * Math.min(width, height),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0.08 * width, // Adjust the factor to control the margin
  },
  text: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default TaskText;
