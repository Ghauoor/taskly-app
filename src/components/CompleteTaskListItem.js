import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const CompleteTaskListItem = ({Date, task, time, colors, start, end}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <Text style={styles.date}>{Date}</Text>
      <TouchableOpacity
        style={[styles.container, isExpanded ? styles.expandedContainer : null]}
        activeOpacity={0.8}
        onPress={toggleAccordion}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={colors}
            start={start}
            end={end}
            style={styles.gradient}
          />
        </View>
        {/* Text Container */}
        <View style={styles.textContainer}>
          <BouncyCheckbox
            size={20}
            fillColor="transparent"
            unfillColor="#FFFFFF"
            iconStyle={{borderRadius: 3}}
            innerIconStyle={{
              borderWidth: 2,
              borderRadius: 4,
              borderColor: 'transparent',
            }}
            style={{borderRadius: 4, marginTop: 2}}
          />
          <View style={styles.textContent}>
            <Text style={styles.taskText}>{task}</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={toggleAccordion}>
            <Icon name={isExpanded ? 'up' : 'down'} size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
        {isExpanded && (
          <Text style={styles.additionalContent}>
            Additional content goes here...
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 80,
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  expandedContainer: {
    height: 140,
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  textContent: {
    height: '100%',
    marginLeft: 8,
    marginTop: 25,
  },
  taskText: {
    fontSize: 19,
    color: '#fff',
  },
  timeText: {
    color: '#fff',
    marginLeft: 2,
    marginBottom: 5,
  },
  iconContainer: {
    marginLeft: 190,
    marginTop: 10,
  },
  date: {
    color: '#000000',
    marginTop: 10,
  },
  additionalContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    color: '#fff',
  },
});

export default CompleteTaskListItem;
