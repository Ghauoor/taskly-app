import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';

const DatePickerComponent = props => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [hasSelectedDate, setHasSelectedDate] = useState(false);

  const formatDate = date => {
    if (hasSelectedDate) {
      // Format the date.
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      return formattedDate;
    } else {
      return props.placeholder;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      {/* Input field */}
      <View style={styles.dateContainer}>
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText} // pass null to disable
          value={formatDate(date)}
          editable={false}
        />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Icon name="down" size={22} color="#222A47" />
        </TouchableOpacity>
      </View>
      {open && (
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            props.setSelectedDate(date);
            setHasSelectedDate(true);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
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
    width: '92%',
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#707070',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222A47',
    marginLeft: 5,
  },
});

export default DatePickerComponent;
