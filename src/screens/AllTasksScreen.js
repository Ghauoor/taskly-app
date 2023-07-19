import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {FAB} from 'react-native-paper';
import AppBarComponent from '../components/AppBarComponent';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DrawerActions} from '@react-navigation/native';

const AllTasksScreen = ({navigation}) => {
  const handleToggleMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const tasks = [
    {id: '1', title: 'Daily Meeting with team', description: '7:30 PM'},
    {id: '2', title: 'Daily Meeting with team', description: '7:30 PM'},
    {id: '3', title: 'Daily Meeting with team', description: '7:30 PM'},
    {id: '4', title: 'Daily Meeting with team', description: '7:30 PM'},
    {id: '5', title: 'Daily Meeting with team', description: '7:30 PM'},
    {id: '6', title: 'Daily Meeting with team', description: '7:30 PM'},
    {id: '7', title: 'Daily Meeting with team', description: '7:30 PM'},
    {id: '8', title: 'Daily Meeting with team', description: '7:30 PM'},
  ];

  const [taskState, setTaskState] = useState(tasks.map(() => false));

  const toggleTask = index => {
    const updatedTaskState = [...taskState];
    updatedTaskState[index] = !updatedTaskState[index];
    setTaskState(updatedTaskState);
  };

  const renderItem = ({item, index}) => {
    const isChecked = taskState[index];
    //const colors = ['#FFFF00', '#2196F3', '#FF00FF', '#00FFFF'];
    const unCheckedcolors = ['#03A9F4', '#FFFF00', '#AB47BC'];

    const renderCheckedIcon = () => {
      //console.log('Icon is reder'),
      return (
        <LinearGradient
          colors={['#A100FE', '#F300F0']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.checkedIcon}>
          <Icon name="check" size={24} color="#ffffff" />
        </LinearGradient>
      );
    };

    const checkedFillColor = isChecked
      ? // ? renderCheckedIcon()
        '#A100FE'
      : unCheckedcolors[index % unCheckedcolors.length];

    return (
      <View style={[styles.item, {borderColor: '#868686'}]}>
        <BouncyCheckbox
          //disableBuiltInState
          isChecked={isChecked}
          fillColor={checkedFillColor}
          renderIcon={renderCheckedIcon}
          innerIconStyle={{borderWidth: 2}}
          onPress={() => toggleTask(index)}
        />
        <View style={styles.taskContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
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
          data={tasks}
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
          onPress={() => navigation.navigate('CreateTask')}
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
  checkedIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AllTasksScreen;
