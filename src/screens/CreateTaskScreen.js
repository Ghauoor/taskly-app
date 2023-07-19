import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Header from '../components/Header';
import GradientButton from '../components/GradientButton';
import CreateTaskComponent from '../components/CreateTaskComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import TimeInputComponent from '../components/TimeInputComponent';

const CreateTaskScreen = ({navigation, route}) => {
  const [titleName, setTitleName] = useState('');
  const [description, setDescription] = useState('');
  const [innerLocation, setInnerLocation] = useState('');
  const [initialTime, setInitialTime] = useState('');
  const [endTime, setEndTime] = useState('');

  //get the category
  let category;
  if (route.params) {
    category = route.params.category;
    console.log('SCREEn => ', category);
  } else {
    category = '';
  }
  const handleSelectCategory = () => {
    navigation.navigate('CategoriesScreen');
  };
  // Backbutton
  const handleBackIconPress = () => {
    navigation.goBack();
  };

  //Tittle text field
  const handleTitleText = text => {
    console.log(text);
    setTitleName(text);
  };

  // Description Text Field
  const handleDescriptionText = text => {
    console.log(text);
    setDescription(text);
  };

  //initial time
  const handleInitialTime = text => {
    console.log(text);
    setInitialTime(text);
  };

  //end time
  const handleEndTime = text => {
    console.log(text);
    setEndTime(text);
  };

  return (
    <View style={styles.container}>
      <Text>{category}</Text>
      <Header
        name="Create Task"
        textStyle={styles.title}
        iconColor="#111111"
        onPress={handleBackIconPress}
      />
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
          {/* Title */}
          <CreateTaskComponent
            title="Title"
            placeholder="Title"
            text={titleName}
            onChangeText={handleTitleText}
          />
          {/* description */}
          <View style={styles.descriptionMargin} />
          <CreateTaskComponent
            title="Description"
            placeholder="Description"
            text={description}
            onChangeText={handleDescriptionText}
          />

          {/* Location */}
          <Text style={styles.locationText}>Location</Text>
          <TextInput
            value={innerLocation}
            onChangeText={setInnerLocation}
            placeholder=" Location"
            placeholderTextColor="#B9BDCC"
          />
          {/* Date */}
          <DatePickerComponent title="Date" placeholder="dd/mm/yy" />
          {/* Time input container  */}
          <View style={styles.timeInputContainer}>
            <TimeInputComponent
              title="Time"
              placeholder="00:00 AM"
              text={initialTime}
              onChangeText={handleInitialTime}
            />
            {/* Manage the inputs */}
            <View style={{flexDirection: 'row', marginLeft: 60}}>
              <Text style={styles.line}>----</Text>
              <TimeInputComponent
                placeholder="00:00 AM"
                text={endTime}
                onChangeText={handleEndTime}
              />
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
    marginLeft: 10,
  },
});

export default CreateTaskScreen;
