import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const TaskBoxComponent = ({text, subText, backgroundColor, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.dateContainer, {backgroundColor}]}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.subText}>{subText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 2,
  },
  subText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111',
  },
  dateContainer: {
    height: 70,
    width: 120,
    marginTop: 12,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});

export default TaskBoxComponent;
