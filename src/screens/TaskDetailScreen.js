import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import TaskDetailHeader from '../components/TaskDetailHeader';
import TaskBoxComponent from '../components/TaskBoxComponent';

const TaskDetailScreen = () => {
  return (
    <View style={styles.container}>
      {/* Task Detail Header */}
      <View style={styles.taskHeaderContainer}>
        <TaskDetailHeader />
      </View>
      <View style={styles.taskBoxContainer}>
        <TaskBoxComponent
          text="All"
          subText="12 Tasks"
          backgroundColor={'#DB94D4'}
        />
        <TaskBoxComponent
          text="Meetings"
          subText="14 Tasks"
          backgroundColor={'#FCCDB7'}
        />
        <TaskBoxComponent
          text="Activities"
          subText="14 Tasks"
          backgroundColor={'#BBC4D4'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskBoxContainer: {
    flexDirection: 'row',
    height: '18%',
    justifyContent: 'space-evenly',
  },
});

export default TaskDetailScreen;
