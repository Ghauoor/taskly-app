import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Header from '../components/Header';
import GradientButton from '../components/GradientButton';
import CreateTaskComponent from '../components/CreateTaskComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import TimeInputComponent from '../components/TimeInputComponent';

const CreateTaskScreen = ({navigation}) => {
  const handleSelectCategory = () => {
    navigation.navigate('CategoriesScreen');
  };
  return (
    <View style={styles.container}>
      <Header name="Create Task" textStyle={styles.title} iconColor="#111111" />
      {/* Select Category Button */}
      <View style={styles.buttonContainer}>
        <GradientButton
          colors={['#A100FE', '#F300F0']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 2}}
          text="Select Category"
          onPress={handleSelectCategory}
        />
      </View>
      {/* input text */}
      <View style={styles.inputContainer}>
        <View style={styles.textFields}>
          <CreateTaskComponent title="Title" placeholder="Title" />
          <View style={styles.descriptionMargin} />
          <CreateTaskComponent title="Description" placeholder="Description" />
          <Text style={styles.locationText}>Location</Text>
          <Text style={styles.locationInnerText}>Location</Text>
          {/* Date */}
          <DatePickerComponent title="Date" des="dd/mm/yy" />
          {/* Time input container  */}
          <View style={styles.timeInputContainer}>
            <TimeInputComponent title="Time" placeholder="00:00 AM" />
            {/* Manage the inputs */}
            <View style={{flexDirection: 'row', marginLeft: 60}}>
              <Text style={styles.line}>----</Text>
              <TimeInputComponent placeholder="00:00 AM" />
            </View>
          </View>
        </View>
      </View>
      {/* Button */}
      <View style={styles.buttonContainerSave}>
        <GradientButton
          colors={['#F300F0', '#A100FE']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0}}
          text="Save"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginLeft: 60,
    color: 'black',
  },
  backIcon: {
    color: '#111111',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  inputContainer: {
    flex: 1,
    marginTop: 20,
    marginLeft: 30,
  },
  textFields: {
    flex: 1,
  },
  descriptionMargin: {
    marginVertical: 5,
  },
  locationText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111111',
  },
  locationInnerText: {
    marginLeft: 25,
    color: '#B9BDCC',
    marginTop: 12,
    marginBottom: 18,
  },
  timeInputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  line: {
    color: 'yellow',
    fontSize: 25,
    marginTop: 40,
    marginRight: 25,
  },
  buttonContainerSave: {
    marginTop: 20,
    marginBottom: 5,
  },
});

export default CreateTaskScreen;
