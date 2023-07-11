import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const SettingsCard = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Image
        source={props.image}
        style={{
          width: 50,
          height: 50,
          resizeMode: 'contain',
          marginRight: 12,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '14%',
    width: '90%',
    marginTop: 10,

    borderRadius: 18,
    borderColor: '#707070',
    borderWidth: 1,
    overflow: 'hidden',
  },
  title: {
    color: '#3E3E3E',
    fontSize: 25,
    marginLeft: 22,
  },
});

export default SettingsCard;
