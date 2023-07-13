import React from 'react';
import {Text} from 'react-native';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const DatePickerComponent = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      {/* Input field */}
      <View style={styles.dateContainer}>
        <Text>{props.des}</Text>
        <TouchableOpacity onPress={null}>
          <Icon name="down" size={22} color="#222A47" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111111',
  },
  dateContainer: {
    height: 60,
    width: '95%',
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#707070',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DatePickerComponent;