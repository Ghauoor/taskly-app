import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '../components/Header';
import GradientButton from '../components/GradientButton';
import CreateTaskComponent from '../components/CreateTaskComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import TimeInputComponent from '../components/TimeInputComponent';
import CategoryFieldComponent from '../components/CategoryFieldComponent';
import ErrorDialog from '../components/ErrorDialog';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import Notifications from '../constants/Notifications';

const {width, height} = Dimensions.get('window');
const aspectRatio = height / width;

const CreateTaskScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.userState.user);
  const [titleName, setTitleName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [initialTime, setInitialTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  let category;
  if (route.params) {
    category = route.params.category;
    console.log('SCREEN => ', category);
  } else {
    category = '';
  }

  const handleBackIconPress = () => {
    navigation.goBack();
  };

  const handleTitleText = text => {
    console.log(text);
    setTitleName(text);
  };

  const handleDescriptionText = text => {
    console.log(text);
    setDescription(text);
  };

  const handleInitialTime = text => {
    console.log(text);
    setInitialTime(text);
  };

  const handleEndTime = text => {
    console.log(text);
    setEndTime(text);
  };

  const handleSave = async () => {
    if (
      !titleName ||
      !description ||
      !location ||
      !initialTime ||
      !endTime ||
      !selectedDate
    ) {
      handleSetErrorMessage('All fields are required.');
      return;
    }

    try {
      const db = firebase.firestore();
      const currentUserId = user.id;

      // Generate a random ID for the todo item
      const todoItemId = db.collection('Users').doc().id;

      const todoItem = {
        categoryName: category,
        id: todoItemId,
        title: titleName,
        description: description,
        location: location,
        initialTime: initialTime,
        endTime: endTime,
        date: selectedDate,
        isSelected: false,
      };

      await db
        .collection('Users')
        .doc(currentUserId)
        .update({
          todo: firestore.FieldValue.arrayUnion(todoItem),
        });
      // Schedule the notification for the endTime
      const endTimeNotification = new Date(endTime);
     // const notificationMessage = `Your task "${titleName}" is ending soon!`;

      Notifications.schduleNotification(
        endTimeNotification,
        titleName,
        description,
      );

      alert('Task created successfully!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSetErrorMessage = message => {
    setErrorMessage(message);
    setErrorVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.container}>
          <Header
            name="Create Task"
            textStyle={styles.title}
            iconColor="#111111"
            onPress={handleBackIconPress}
            size={22}
          />
          <View style={styles.catContainer}>
            <CategoryFieldComponent
              colors={['#A100FE', '#F300F0']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 2}}
              text={category}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.textFields}>
              <CreateTaskComponent
                title="Title"
                placeholder="Title"
                text={titleName}
                onChangeText={handleTitleText}
              />
              <View style={styles.descriptionMargin} />
              <CreateTaskComponent
                title="Description"
                placeholder="Description"
                text={description}
                onChangeText={handleDescriptionText}
              />
              <Text style={styles.locationText}>Location</Text>
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder=" Location"
                placeholderTextColor="#B9BDCC"
              />
              <View
                style={{marginLeft: width * 0.01, marginBottom: height * 0.01}}>
                <DatePickerComponent
                  title="Date"
                  placeholder="dd/mm/yy"
                  setSelectedDate={setSelectedDate}
                />
              </View>

              <View style={styles.timeInputContainer}>
                <TimeInputComponent
                  title="Time"
                  text={initialTime}
                  onChangeText={handleInitialTime}
                  time={initialTime}
                  setTime={setInitialTime}
                />
                <View style={{flexDirection: 'row', marginLeft: 0.13 * width}}>
                  <Text style={styles.line}>----</Text>
                  <TimeInputComponent
                    text={endTime}
                    onChangeText={handleEndTime}
                    time={endTime}
                    setTime={setEndTime}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <GradientButton
              colors={['#F300F0', '#A100FE']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              text="Save"
              onPress={handleSave}
            />
          </View>
          <ErrorDialog
            visible={errorVisible}
            message={errorMessage}
            onClose={() => setErrorVisible(false)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  title: {
    fontSize: 10 * aspectRatio,
    marginLeft: 0.22 * width,
    color: 'black',
    fontWeight: '700',
  },
  catContainer: {
    alignItems: 'center',
    marginTop: 0.02 * height,
  },
  inputContainer: {
    flex: 1,
    marginTop: 0.03 * height,
    marginLeft: 0.04 * width,
  },
  textFields: {
    flex: 1,
  },
  descriptionMargin: {
    marginVertical: 0.01 * height,
  },
  locationText: {
    marginTop: 0.03 * height,
    fontSize: 7 * aspectRatio,
    fontWeight: 'bold',
    color: '#111111',
    marginLeft: 0.01 * width,
  },
  timeInputContainer: {
    flexDirection: 'row',
    marginTop: 0.01 * height,
    marginLeft: 0.01 * width,
  },
  line: {
    color: 'yellow',
    fontSize: 10 * aspectRatio,
    marginTop: 0.06 * height,
    marginRight: 0.07 * width,
    fontWeight: 'bold',
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    marginBottom: 0.001 * height,
    //marginRight: width * 0.02,
  },
});

export default CreateTaskScreen;
