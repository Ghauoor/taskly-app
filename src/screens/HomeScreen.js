import React from 'react';
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

const HomeScreen = ({navigation}) => {
  const currentDate = `Today ${moment().format('DD, MMM')}`;

  const {user} = useSelector(state => state.userState.user);

  const taskListData = [
    {
      key: 'task1',
      Date: 'Today 03, Mar',
      task: 'Wake-Up',
      time: '06.00 AM',
      colors: ['#A100FE', '#F300F0'],
      start: {x: 0, y: 1},
      end: {x: 1, y: 0},
    },
    {
      key: 'task2',
      task: 'Wake-Up',
      time: '06.00 AM',
      colors: ['#E100FF', '#FCCDB7'],
      start: {x: 1, y: 0},
      end: {x: 0, y: 1},
    },
    {
      key: 'task3',
      Date: '05, Mar',
      task: 'Wake-Up',
      time: '06.00 AM',
      colors: ['#BBC4D4', '#5D86CC'],
      start: {x: 0, y: 1},
      end: {x: 1, y: 0},
    },
    {
      key: 'task4',
      Date: '06, Mar',
      task: 'Wake-Up',
      time: '06.00 AM',
      colors: ['#EC55E1', '#5E89D4'],
      start: {x: 0, y: 1},
      end: {x: 1, y: 0},
    },
    {
      key: 'task5',
      Date: '08, Mar',
      task: 'Wake-Up',
      time: '06.00 AM',
      colors: ['#556eec', '#00a6ff'],
      start: {x: 1, y: 0},
      end: {x: 0, y: 0},
    },
  ];

  const renderItem = ({item}) => (
    <CompleteTaskListItem
      Date={item.Date}
      task={item.task}
      time={item.time}
      colors={item.colors}
      start={item.start}
      end={item.end}
    />
  );

  const handleToggleMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.nameText}>What's up, {user.name}</Text>
        </View>
        <View style={styles.imageBackgroundContainer}>
          <Image
            source={require('../../assets/images/bubble.png')}
            style={styles.imageBackground}
          />
        </View>
      </View>

      <Text style={styles.categoriesText}>Categories</Text>
      <View style={styles.taskBoxContainer}>
        <TaskBoxComponent
          text="All"
          subText="12 Tasks"
          backgroundColor={'#DB94D4'}
        />
        <TaskBoxComponent
          text="Meetings"
          subText="14 Tasks"
          backgroundColor={'#FCCDB7'}
        />
        <TaskBoxComponent
          text="Activities"
          subText="14 Tasks"
          backgroundColor={'#BBC4D4'}
        />
      </View>

      <FlatList
        data={taskListData}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.taskListContainer}
      />

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
    height: '15%',
    gap: deviceWidth * 0.04,
    marginLeft: deviceWidth * 0.05,
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
  },
});

export default HomeScreen;
