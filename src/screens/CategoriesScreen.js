import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBarComponent from '../components/AppBarComponent';

const CategoriesScreen = () => {
  const categories = [
    {id: '1', title: 'All'},
    {id: '2', title: 'Work'},
    {id: '3', title: 'Personal'},
    {id: '4', title: 'Wishlist'},
    {id: '5', title: 'Birthday'},
    {id: '6', title: 'Anniversaries'},
    {id: '7', title: 'Car Maintenance'},
  ];

  const renderItem = ({item, index}) => {
    const saveIconColor = index % 2 === 0 ? '#AB47BC' : '#D226F2';

    return (
      <View style={styles.item}>
        <View style={styles.categoryItem}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.saveIcon, {backgroundColor: saveIconColor}]}>
            <Icon name="save" size={24} color="#ffffff" />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppBarComponent title="Categories" style={styles.appBar} />
      <View style={styles.listContainer}>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
  appBar: {
    marginLeft: 6,
  },
  listContainer: {
    marginTop: 5,
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 18,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    marginLeft: 8,
    color: '#111111',
    fontWeight: 'bold',
  },
  item: {
    marginBottom: 7,
    borderRadius: 8,
    padding: 4,
    borderWidth: 2,
    borderColor: '#868686',
  },
  saveIcon: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 'auto',
    marginRight: 10,
  },
});

export default CategoriesScreen;
