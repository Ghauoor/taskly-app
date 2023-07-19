import React from 'react';
import {View, StyleSheet, Text, FlatList, Image} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {FAB} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AppBarComponent from '../components/AppBarComponent';
import TaskBoxComponent from '../components/TaskBoxComponent';
import CompleteTaskListItem from '../components/CompleteTaskListItem';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const currentDate = `Today ${moment().format('DD, MMM')}`;

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
      Date: 'Tommorow 03, Mar',
      task: 'Wake-Up',
      time: '06.00 AM',
      colors: ['#E100FF', '#FCCDB7'],
      start: {x: 1, y: 0},
      end: {x: 0, y: 1},
    },
    {
      key: 'task3',
      Date: '05, Mar',
      task: 'Wake-Up',
      time: '06.00 AM',
      colors: ['#BBC4D4', '#5D86CC'],
      start: {x: 0, y: 1},
      end: {x: 1, y: 0},
    },
    {
      key: 'task4',
      Date: '06, Mar',
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

  const handleToggleMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.container}>
      <AppBarComponent
        handleToggleMenu={handleToggleMenu}
        showSearchIcon={true}
        title={currentDate}
        additionalIcons={[
          {name: 'calendar', color: '#9200FA'},
          {
            type: 'image',
          },
        ]}
        style={styles.appBar}
      />

      {/* Background Image and Text */}
      <View style={styles.backgroundContainer}>
        <View style={styles.nameTextContainer}>
          <Text style={styles.nameText}>What's up, Olivia</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: 50,
            zIndex: -9999,
          }}>
          <Image
            source={require('../../assets/images/bubble.png')}
            style={styles.imageBackground}></Image>
        </View>
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
        contentContainerStyle={{marginLeft: 18, marginTop: 10}}
      />
      {/* Floating Action Button */}
      <LinearGradient
        colors={['#E100FF', '#7F00FF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.fabGradient}>
        <FAB
          icon={({size}) => <Icon name="add" size={size} color="#FFFFFF" />}
          style={styles.fab}
          onPress={() => navigation.navigate('CreateTask')}
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
    color: '#111111',
    fontFamily: 'Sofia Pro',
    fontWeight: '800',
  },
  categoriesText: {
    fontSize: 16,
    marginLeft: 25,
    marginTop: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  taskBoxContainer: {
    flexDirection: 'row',
    height: '15%',
    gap: 10,
    marginLeft: 20,
  },
  backgroundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  nameTextContainer: {
    width: 'auto',
  },
  imageBackground: {
    height: 100,
    flexDirection: 'row',
    resizeMode: 'contain',
    alignItems: 'center',
    marginTop: 20,
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
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  taskListItem: {
    marginTop: 50,
  },
});

export default HomeScreen;
