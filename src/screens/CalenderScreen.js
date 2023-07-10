import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import AppBarComponent from '../components/AppBarComponent';

import TaskText from '../components/TaskText';
import {FlatList} from 'react-native';

const CalendarScreen = () => {
  const DATA = [
    {
      id: 1,
      task: 'Play Takken 7',
      time: '7:00Am - 8:00',
      place: 'Gaming Center',
    },
    {
      id: 3,
      task: 'Coding',
      time: '11:00Am - 2:00',
      place: 'Home',
    },
  ];
  const currentDate = moment().format('MMMM Do, YYYY');

  const marked = {
    '2023-07-09': {marked: true},
    '2023-07-08': {marked: true},
    '2023-07-07': {marked: true},
    '2023-07-10': {
      marked: true,
      selected: true,
      selectedColor: '#9C00FF',
      selectedTextColor: '#fff',
      dotColor: 'white',
    },
  };

  //Render item func
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.mainText}>{item.task}</Text>
      <Text
        style={styles.subText}>{`•  ${item.time}   |   ${item.place}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppBarComponent title="Calendar" style={styles.appBar} />
      <View style={styles.dateContainer}>
        {/* Date  */}
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          hideExtraDays
          renderHeader={() => {}}
          markedDates={marked}
          hideArrows
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
          <TaskText />
        </View>
        {/* Flat List */}
        <View style={styles.listContainer}>
          <FlatList
            data={DATA}
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
