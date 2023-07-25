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

  const [taskState, setTaskState] = useState([]);
  const [todoList, setTodoList] = useState([]);

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
            console.log('Todo list: ', todoData);
            setTodoList(todoData);
            // Set the initial task state with all tasks unchecked
            setTaskState(todoData.map(() => false));
          } else {
            console.log('User document does not exist.');
          }
        },
        error => {
          console.error('Error getting user document:', error);
        },
      );

    return () => unsubscribe();
  }, [user.id]); // will run when the user is change

  const toggleTask = index => {
    const updatedTaskState = [...taskState];
    updatedTaskState[index] = !updatedTaskState[index];
    setTaskState(updatedTaskState);
  };

  const renderItem = ({item, index}) => {
    const isChecked = taskState[index];
    const unCheckedcolors = ['#03A9F4', '#FFFF00', '#AB47BC'];
    const checkedFillColor = isChecked
      ? '#A100FE'
      : unCheckedcolors[index % unCheckedcolors.length];

    return (
      <View style={[styles.item, {borderColor: '#868686'}]}>
        <BouncyCheckbox
          isChecked={isChecked}
          fillColor={checkedFillColor}
          innerIconStyle={{borderWidth: 2}}
          onPress={() => toggleTask(index)}
        />
        <View style={styles.taskContent}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.description}>{item.initialTime} : </Text>
            <Text style={styles.description}>{item.endTime} am</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppBarComponent
        title="All Task Screen"
        style={styles.appBar}
        showSearchIcon={true}
        handleToggleMenu={handleToggleMenu}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={todoList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
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
          onPress={() => navigation.navigate('Categories')}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
  appBar: {
    paddingLeft: 0,
  },
  listContainer: {
    marginTop: 16,
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
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
    marginBottom: 8,
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
