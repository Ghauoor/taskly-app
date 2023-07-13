import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const TaskDetailHeader = () => {
  return (
    <LinearGradient
      colors={['#E100FF', '#7F00FF']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      style={styles.container}>
      <View style={styles.columnContainer}>
        {/* Date */}
        <Text style={styles.title}>03 June 2021</Text>
        {/* Text */}
        <Text style={styles.subtitle}>Plan Your Day</Text>
        {/* Days */}
        <View style={styles.daysContainer}>
          {renderDays()}
          <Icon
            name="chevron-right"
            size={24}
            color="#fff"
            style={styles.chevronIcon}
          />
        </View>
      </View>
      {/* X Icon */}
      <Icon name="close" size={24} color="#fff" style={styles.icon} />
    </LinearGradient>
  );
};

const renderDays = () => {
  const days = [
    {date: '01', day: 'Mon'},
    {date: '02', day: 'Tue'},
    {date: '03', day: 'Wed'},
    {date: '04', day: 'Thu'},
    {date: '05', day: 'Fri'},
    {date: '06', day: 'Sat'},
    {date: '07', day: 'Sun'},
  ];

  return days.map(({date, day}) => {
    const dayBoxStyle =
      day === 'Mon' ? [styles.dayBox, styles.mondayBox] : styles.dayBox;

    const dayTextStyle =
      day === 'Mon' ? [styles.dayText, styles.mondayText] : styles.dayText;

    const dateTextStyle =
      day === 'Mon'
        ? [styles.dateText, styles.mondayDateText]
        : styles.dateText;

    return (
      <View key={date} style={styles.dayContainer}>
        <View style={dayBoxStyle}>
          <Text style={dateTextStyle}>{date}</Text>
          <Text style={dayTextStyle}>{day}</Text>
        </View>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  daysContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dayBox: {
    width: 45,
    height: 45,
    backgroundColor: '#FFFFFF94',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mondayBox: {
    backgroundColor: '#fff',
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mondayDateText: {
    color: '#111',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mondayText: {
    color: '#111',
  },
  chevronIcon: {
    marginLeft: -3,
  },
});

export default TaskDetailHeader;
