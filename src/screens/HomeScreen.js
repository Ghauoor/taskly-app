import React from 'react';
import {View, StyleSheet, Text, ImageBackground, FlatList} from 'react-native';
import AppBarComponent from '../components/AppBarComponent';
import TaskBoxComponent from '../components/TaskBoxComponent';
import CompleteTaskListItem from '../components/CompleteTaskListItem';
import {FAB} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
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
      task: 'Wake-Up',
      time: '06.00 AM',
      colors: ['#E100FF', '#FCCDB7'],
      start: {x: 1, y: 0},
      end: {x: 0, y: 1},
    },
    {
      key: 'task3',
      Date: '03, Mar, 2022',
      task: 'Wake-Up',
      time: '06.00 AM',
      colors: ['#BBC4D4', '#5D86CC'],
      start: {x: 0, y: 1},
      end: {x: 1, y: 0},
    },
    {
      key: 'task4',
      Date: '03, Mar, 2022',
      task: 'Wake-Up',
      time: '06.00 AM',
      colors: ['#EC55E1', '#5E89D4'],
      start: {x: 0, y: 1},
      end: {x: 1, y: 0},
    },
  ];

  const renderItem = ({item}) => (
    <CompleteTaskListItem
      Date={item.Date}
      task={item.task}
      time={item.time}
      colors={item.colors}
      start={item.start}
      end={item.end}
    />
  );

  return (
    <View style={styles.container}>
      <AppBarComponent
        showSearchIcon={true}
        additionalIcons={[
          {name: 'calendar', color: '#9200FA'},
          {
            type: 'image',
            //source: '../../assets/images/logo.png',
          },
        ]}
        style={styles.appBar}
      />
      {/* Background Image and Text */}
      <View>
        {/* <ImageBackground
          source={require('../../assets/images/bubble.png')}
          style={styles.imageBackground}> */}
        <Text style={styles.nameText}>What's up, Olivia!</Text>
        {/* </ImageBackground> */}
      </View>
      <Text style={styles.categoriesText}>Categories</Text>
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
      {/* Task List */}
      <FlatList
        data={taskListData}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={{marginLeft: 16}}
      />
      {/* Floating Action Button */}
      <LinearGradient
        colors={['#E100FF', '#7F00FF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.fabGradient}>
        <FAB
          icon={({color, size}) => (
            <Icon name="add" size={size} color="#FFFFFF" />
          )}
          style={styles.fab}
          onPress={() => console.log('FAB Pressed')}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    paddingLeft: 16,
  },
  nameText: {
    fontSize: 35,
    marginLeft: 25,
    color: '#111111',
  },
  categoriesText: {
    fontSize: 16,
    marginLeft: 25,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  taskBoxContainer: {
    flexDirection: 'row',
    height: '18%',
    justifyContent: 'space-evenly',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  fabGradient: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 30,
    borderRadius: 50,
    overflow: 'hidden',
  },
  fab: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default HomeScreen;
