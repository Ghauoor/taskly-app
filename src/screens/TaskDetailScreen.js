import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import TaskDetailHeader from '../components/TaskDetailHeader';

const TaskDetailScreen = () => {
  return (
    <View style={styles.container}>
      {/* Task Detail Header */}
      <View style={styles.taskHeaderContainer}>
        <TaskDetailHeader />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskHeaderContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default TaskDetailScreen;
