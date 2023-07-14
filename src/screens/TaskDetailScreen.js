import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import TaskDetailHeader from '../components/TaskDetailHeader';
import TaskBoxComponent from '../components/TaskBoxComponent';
import CompleteTaskListItem from '../components/CompleteTaskListItem';

const TaskDetailScreen = () => {
  const taskListData = [
    {
      key: 'task1',
      Date: 'Today 03, Mar',
      task: 'Wake-Up',
      time: '06.00 AM',
      colors: ['#A100FE', '#F300F0'],
      start: {x: 0, y: 1},
      end: {x: 1, y: 0},
    },
    {
      key: 'task2',
      Date: '09, Mar, 2022',
      task: 'Briefing with Ghayoor',
      time: '06.00 AM',
      colors: ['#E100FF', '#FCCDB7'],
      start: {x: 1, y: 0},
      end: {x: 0, y: 1},
    },
    {
      key: 'task3',
      Date: '10, Mar, 2022',
      task: 'Wake-Up',
      time: '06.00 AM',
      colors: ['#BBC4D4', '#5D86CC'],
      start: {x: 0, y: 1},
      end: {x: 1, y: 0},
    },
  ];

  const renderItem = ({item, index}) => {
    const previousItem = index > 0 ? taskListData[index - 1] : null;
    const isSameDate = previousItem && previousItem.Date === item.Date;

    return (
      <CompleteTaskListItem
        Date={!isSameDate ? item.Date : undefined}
        task={item.task}
        time={item.time}
        colors={item.colors}
        start={item.start}
        end={item.end}
      />
    );
  };

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
      <FlatList
        data={taskListData}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={{marginLeft: 15}}
      />
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
