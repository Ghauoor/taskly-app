import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {View, StyleSheet, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';

const TimeInputComponent = props => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setOpen(true);
        }}>
        <Text style={styles.text}>{props.title}</Text>
        {/* Input field */}
        <Text
          style={styles.input}
          //placeholder={props.placeholder}
          //onChangeText={props.onChangeText}
          //value={props.text}
          //keyboardType="number-pad"
        >
          {new Date(props.time)
            ? new Date(props.time).toLocaleTimeString()
            : 'Select Time'}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="time"
        onConfirm={date => {
          console.log(date);
          props.setTime(date);
          // setOpen(false);
          // setDate(date);
          // props.setSelectedDate(date);
          // setHasSelectedDate(true);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: '140%',
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#707070',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111111',
  },
});

export default TimeInputComponent;
