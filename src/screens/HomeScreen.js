import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {FAB} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBarComponent from '../components/AppBarComponent';
import TaskBoxComponent from '../components/TaskBoxComponent';
import CompleteTaskListItem from '../components/CompleteTaskListItem';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {firebase} from '@react-native-firebase/firestore';

/*todo:
//! manage the state of check boxes
//! header component
*/

const HomeScreen = ({navigation}) => {
  const currentDate = `Today ${moment().format('DD, MMM')}`;
  const checkDate = moment().format('DD, MMM');

  const {user} = useSelector(state => state.userState.user);

  //todo local
  const [todoList, setTodoList] = useState([]);
  //? fi
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

            // Sort tasks by date in ascending order
            todoData.sort((taskA, taskB) => {
              const dateA = taskA.date.toDate();
              const dateB = taskB.date.toDate();
              return dateA - dateB;
            });

            setTodoList(todoData);
          } else {
            console.log('User document does not exist.');
          }
        },
        error => {
          console.error('Error getting user document:', error);
        },
      );

    return () => unsubscribe();
  }, [user.id]); // will run when the user is changed

  // colors
  const randomColor = [
    '#A100FE',
    '#7DD3FC',
    '#fef08a',
    '#c4b5fd',
    '#fecdd3',
    '#4d41d5',
  ];

  const randomColorPicker = () => {
    const colors = [...randomColor];
    const colorOneIndex = Math.floor(Math.random() * colors.length);
    const colorOne = colors.splice(colorOneIndex, 1)[0];
    const colorTwoIndex = Math.floor(Math.random() * colors.length);
    const colorTwo = colors[colorTwoIndex];
    return [colorOne, colorTwo];
  };

  //random value
  const randomValue = () => {
    return Math.round(Math.random());
  };

  //* Function to handle checkbox press
  const handleCheckboxPress = (index, isSelected) => {
    const updatedTodoList = [...todoList];
    updatedTodoList[index].isSelected = isSelected;

    // Filter out the selected task and set the updated list to state
    const updatedTaskList = updatedTodoList.filter(task => !task.isSelected);
    setTodoList(updatedTaskList);

    // Save the updated data back to Firestore
    const db = firebase.firestore();
    const currentUserId = user.id;
    db.collection('Users')
      .doc(currentUserId)
      .update({
        todo: updatedTaskList,
      })
      .then(() => {
        console.log('Task updated successfully.');
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  //* Render method for the task list
  const renderItem = ({item, index}) => {
    // get time
    const initialTime = new Date(item.initialTime._seconds * 1000);
    const formattedInitialTime = initialTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // get the date
    let fDate = moment(item.date.toDate()).format('DD, MMM');
    const previousItem = index > 0 ? todoList[index - 1] : null;
    const previousDate = previousItem
      ? moment(previousItem.date.toDate()).format('DD, MMM')
      : null;

    const renderDate = !previousDate || fDate !== previousDate;

    fDate =
      fDate === checkDate
        ? `Today ${moment(item.date.toDate()).format('DD, MMM')}`
        : fDate;

    const [colorOne, colorTwo] = randomColorPicker();
    const randomStart = {x: 0, y: 1};
    const randomEnd = {x: 1, y: randomValue()};

    return (
      <CompleteTaskListItem
        Date={renderDate ? fDate : null}
        task={item.title}
        time={formattedInitialTime}
        colors={[colorOne, colorTwo]}
        start={randomStart}
        end={randomEnd}
        additionalContent={item.description}
        isChecked={item.isSelected || false}
        onPress={chck => handleCheckboxPress(index, chck)}
      />
    );
  };

  // Group tasks by categoryName to get unique categories
  const groupedTasks = todoList.reduce((acc, task) => {
    if (!acc[task.categoryName]) {
      acc[task.categoryName] = [task];
    } else {
      acc[task.categoryName].push(task);
    }
    return acc;
  }, {});

  //* list of category colors
  let categoryColors = ['#DB94D4', '#FCCDB7', '#BBC4D4', '#d3acd0', '#84dbcc'];

  //* Render method for the category
  const renderTaskBoxItem = ({item, index}) => {
    // Get the list of tasks for this category
    const tasksForCategory = groupedTasks[item.categoryName] || [];
    const totalTasks = tasksForCategory.length;
    const bgOne = categoryColors[index % categoryColors.length];

    const handleTaskBoxPress = () => {
      if (
        selectedCategory === item.categoryName ||
        item.categoryName === 'All'
      ) {
        //* "All" is clicked again, reset the filtered tasks
        setSelectedCategory(null);
        setFilteredTasks([]);
      } else {
        if (item.categoryName === 'All') {
          //* If the "All" category is clicked, show all tasks
          setSelectedCategory(item.categoryName);
          setFilteredTasks(todoList);
        } else {
          //* Filter tasks based on the category name
          setSelectedCategory(item.categoryName);
          setFilteredTasks(tasksForCategory);
        }
      }
    };

    return (
      <View style={styles.taskBoxContainer}>
        <TaskBoxComponent
          text={item.categoryName}
          subText={`${totalTasks} Tasks`}
          backgroundColor={bgOne}
          onPress={handleTaskBoxPress}
        />
      </View>
    );
  };

  //* Toggle the drawer
  const handleToggleMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.container}>
      {/* Appbar  */}
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

      <View style={styles.backgroundContainer}>
        <View style={styles.nameTextContainer}>
          {/* Name */}
          <Text style={styles.nameText}>What's up, {user.name}</Text>
        </View>
        {/* Image */}
        <View style={styles.imageBackgroundContainer}>
          <Image
            source={require('../../assets/images/bubble.png')}
            style={styles.imageBackground}
          />
        </View>
      </View>

      <Text style={styles.categoriesText}>Categories</Text>

      {/* List of categories */}
      <FlatList
        data={Object.keys(groupedTasks).map(categoryName => ({categoryName}))}
        renderItem={renderTaskBoxItem}
        keyExtractor={item => item.id}
        horizontal
        style={styles.taskBoxContainer}
        showsHorizontalScrollIndicator={false}
      />

      {/* List of Tasks  */}
      {selectedCategory ? (
        <FlatList
          data={filteredTasks} //* filteredTasks state here
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.taskListContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={todoList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.taskListContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* FAB  */}
      <LinearGradient
        colors={['#E100FF', '#7F00FF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.fabGradient}>
        <FAB
          icon={({size}) => <Icon name="add" size={size} color="#FFFFFF" />}
          style={styles.fab}
          onPress={() => navigation.navigate('CategoriesScreen')}
        />
      </LinearGradient>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    paddingLeft: deviceWidth * 0.04,
  },
  nameText: {
    fontSize: deviceWidth * 0.08,
    color: '#111111',
    fontFamily: 'Sofia Pro',
    fontWeight: '800',
  },
  categoriesText: {
    fontSize: deviceWidth * 0.04,
    marginLeft: deviceWidth * 0.05,
    marginTop: deviceWidth * 0.08,
    marginBottom: deviceWidth * 0.04,
    fontWeight: 'bold',
    color: '#111',
  },
  taskBoxContainer: {
    flexDirection: 'row',
    height: deviceHeight * 0.3,
    gap: deviceWidth * 0.04,
    marginLeft: deviceWidth * 0.02,
  },
  backgroundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: deviceWidth * 0.05,
  },
  nameTextContainer: {
    width: 'auto',
  },
  imageBackgroundContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: deviceWidth * 0.1,
    zIndex: -9999,
  },
  imageBackground: {
    height: deviceWidth * 0.4,
    flexDirection: 'row',
    resizeMode: 'contain',
    alignItems: 'center',
    marginTop: deviceWidth * 0.1,
  },
  fabGradient: {
    position: 'absolute',
    margin: deviceWidth * 0.04,
    right: deviceWidth * 0.03,
    bottom: deviceWidth * 0.06,
    borderRadius: deviceWidth * 0.3,
    overflow: 'hidden',
  },
  fab: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth * 0.16,
    height: deviceWidth * 0.16,
    borderRadius: deviceWidth * 0.06,
  },
  taskListContainer: {
    marginLeft: deviceWidth * 0.04,
    marginTop: deviceWidth * 0.02,
    marginBottom: deviceHeight * 0.9,
  },
});
export default HomeScreen;
