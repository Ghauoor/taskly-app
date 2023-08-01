import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import AppBarComponent from '../components/AppBarComponent';
import {DrawerActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import TaskText from '../components/TaskText';
import {FlatList} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';

const CalendarScreen = ({navigation}) => {
  const [todoList, setTodoList] = useState([]);
  const [taskCount, setTaskCount] = useState(0); // State to hold the task count
  const [taskDate, setTaskDate] = useState([]); // State to hold the dates for tasks.

  // toggle the drawer
  const handleToggleMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const {user} = useSelector(state => state.userState.user);
  const currentDate = moment().format('YYYY-MM-DD');
  const calendertDate = moment().format('MMMM Do, YYYY');

  //fetch the data from firebase

  useEffect(() => {
    const db = firebase.firestore();
    const currentUserId = user.id;

    const unsubscribe = db
      .collection('Users')
      .doc(currentUserId)
      .onSnapshot(
        snapshot => {
          if (snapshot.exists) {
            const userData = snapshot.data();
            const todoData = userData.todo || [];
            // Convert the date format to 'YYYY-MM-DD'
            const formattedTodoData = todoData.map(task => ({
              ...task,
              date: moment(task.date.toDate()).format('YYYY-MM-DD'),
            }));
            // setTaskDate(date);
            setTodoList(formattedTodoData);
          } else {
            console.log('User document does not exist.');
          }
        },
        error => {
          console.error('Error getting user document:', error);
        },
      );

    return () => unsubscribe();
  }, [user.id]);

  // Calculate the task count for the current date
  useEffect(() => {
    const taskCountForCurrentDate = todoList.filter(
      task => task.date === currentDate,
    ).length;
    setTaskCount(taskCountForCurrentDate);
  }, [todoList, currentDate]);

  // Filter tasks for the current date
  const tasksForCurrentDate = todoList.filter(
    task => task.date === currentDate,
  );

  const getMarkedDates = () => {
    const markedDates = {};

    todoList.forEach(task => {
      const taskDate = task.date;
      markedDates[taskDate] = {
        marked: true,
        dotColor: '#9C00FF',
      };
      markedDates[currentDate] = {
        marked: true,
        selected: true,
        selectedColor: '#9C00FF',
        selectedTextColor: '#fff',
        dotColor: 'white',
      };
    });

    return markedDates;
  };

  const markedDate = getMarkedDates();

  //Render item func
  const renderItem = ({item}) => {
    const initialTime = new Date(item.initialTime._seconds * 1000);
    const endTime = new Date(item.initialTime._seconds * 1000);
    const formattedInitialTime = initialTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const formattedEndTime = endTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.mainText}>{item.title}</Text>
        <Text
          style={
            styles.subText
          }>{`•  ${formattedInitialTime} - ${formattedEndTime}   |   ${item.location}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppBarComponent
        title="Calendar"
        style={styles.appBar}
        showSearchIcon={true}
        handleToggleMenu={handleToggleMenu}
      />
      <View style={styles.dateContainer}>
        {/* Date  */}
        <Text style={styles.dateText}>{calendertDate}</Text>
      </View>
      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          hideExtraDays
          renderHeader={() => {}}
          markedDates={markedDate}
          hideArrows
          enableSwipeMonths
          theme={{
            calendarBackground: 'transparent',
            dotColor: '#3D6F67',
            textDayFontSize: 16,
            textDayFontWeight: 'bold',
          }}
        />
        {/* Task Text */}
        <View style={styles.textBoxStyle}>
          <Text style={styles.text}>Task List</Text>
          <TaskText numberOfTasks={taskCount} />
        </View>
        {/* Flat List */}
        <View style={styles.listContainer}>
          <FlatList
            data={tasksForCurrentDate}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatItemsStyle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
  appBar: {
    marginLeft: 6,
  },
  dateContainer: {
    alignItems: 'flex-start',
    marginTop: 20,
    marginLeft: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
  calendarContainer: {
    flex: 1,
  },
  gradient: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  textBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
  listContainer: {
    flex: 1,
    padding: 15,
  },
  itemContainer: {
    marginBottom: 7,
    borderRadius: 8,
    padding: 10,
    borderWidth: 2,
    borderColor: '#868686',
    marginRight: 10,
    marginBottom: 15,
  },
  mainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
    marginLeft: 10,
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 10,
  },
  flatItemsStyle: {
    paddingLeft: 8,
  },
});

export default CalendarScreen;
