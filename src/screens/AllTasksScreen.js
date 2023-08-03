import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {FAB} from 'react-native-paper';
import AppBarComponent from '../components/AppBarComponent';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore, {firebase} from '@react-native-firebase/firestore';

const AllTasksScreen = ({navigation}) => {
  const handleToggleMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const {user} = useSelector(state => state.userState.user);
  console.log(user);
  const emptyListText = 'No tasks found. Add some tasks!';

  const [taskState, setTaskState] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredTodoList, setFilteredTodoList] = useState(todoList);

  //* get the todo array
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

            // Set the initial task state with all tasks' isSelected values
            setTaskState(todoData.map(task => task.isSelected || false));
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

  useEffect(() => {
    const filteredList = todoList.filter(task =>
      task.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredTodoList(filteredList);
  }, [searchText, todoList]);

  // toggle the
  const toggleTask = index => {
    const updatedTaskState = [...taskState];
    updatedTaskState[index] = !updatedTaskState[index];

    const updatedTodoList = [...todoList];
    updatedTodoList[index].isSelected = updatedTaskState[index];

    setTaskState(updatedTaskState);
    setTodoList(updatedTodoList);

    // Update the corresponding task in Firebase
    const db = firebase.firestore();
    const currentUserId = user.id;
    db.collection('Users').doc(currentUserId).update({
      todo: updatedTodoList,
    });
  };

  const renderItem = ({item, index}) => {
    console.log('ITEM =>', item);
    isChecked = item.isSelected;
    const initialTime = new Date(item.initialTime._seconds * 1000);
    const formattedInitialTime = initialTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    console.log(isChecked);
    const unCheckedcolors = ['#03A9F4', '#FFFF00', '#AB47BC'];
    const checkedFillColor = item.isSelected
      ? '#ef3af5'
      : unCheckedcolors[index % unCheckedcolors.length];

    return (
      <View style={[styles.item, {borderColor: '#868686'}]}>
        <BouncyCheckbox
          isChecked={item.isSelected}
          fillColor={checkedFillColor}
          innerIconStyle={{
            borderWidth: 2,
          }}
          onPress={() => toggleTask(index)}
        />
        <View style={styles.taskContent}>
          {/* tiitle text */}
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{formattedInitialTime}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <AppBarComponent
        title="All Task Screen"
        style={styles.appBar}
        showSearchIcon={true}
        handleToggleMenu={handleToggleMenu}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {/* List of all todo's */}
      <View style={styles.listContainer}>
        {filteredTodoList.length > 0 ? (
          <FlatList
            data={filteredTodoList} // Use the filteredTodoList as the data source
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <Text style={styles.emptyListText}>{emptyListText}</Text>
        )}
      </View>
      {/* FAB */}
      <LinearGradient
        colors={['#A100FE', '#F300F0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.fabGradient}>
        <FAB
          style={styles.fab}
          icon={({size, color}) => (
            <Icon name="add" size={size} color="#ffffff" />
          )}
          // Navigation to categories screen
          onPress={() => navigation.navigate('Categories')}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
  },
  appBar: {
    paddingLeft: 0,
  },
  listContainer: {
    marginTop: 15,
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 9,
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: '#888888',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 2,
  },
  taskContent: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#111111',
  },
  description: {
    fontSize: 14,
  },
  fabGradient: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 30,
    borderRadius: 50,
    overflow: 'hidden',
  },
  fab: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default AllTasksScreen;
