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
          <View style={styles.checkboxContainer}>
            <BouncyCheckbox
              size={20}
              fillColor="transparent"
              unfillColor="#FFFFFF"
              iconStyle={{borderRadius: 1}}
              innerIconStyle={{
                borderWidth: 2,
                borderRadius: 4,
                borderColor: 'transparent',
              }}
              style={{borderRadius: 4, marginTop: 2}}
            />
          </View>
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
    width: 380,
    height: 90,
    //marginTop: 10,
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 18,
  },
  checkboxContainer: {
    alignSelf: 'center',
  },
  textContent: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 10,
  },
  taskText: {
    fontSize: 19,
    color: '#fff',
    marginLeft: 10,
  },
  timeText: {
    color: '#fff',
    marginLeft: 11,
  },
  iconContainer: {
    marginTop: 10,
  },
  date: {
    color: '#000000',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 24,
  },
  additionalContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    color: '#fff',
    marginLeft: 45,
  },
});

export default CompleteTaskListItem;
