import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const CompleteTaskListItem = ({
  Date,
  task,
  time,
  colors,
  start,
  end,
  additionalContent,
  onPress,
  isChecked,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const deviceWidth = Dimensions.get('window').width;
  const containerWidth = deviceWidth * 0.94;
  return (
    <View>
      {Date && <Text style={styles.date}>{Date}</Text>}
      <TouchableOpacity
        style={[
          styles.container,
          isExpanded ? styles.expandedContainer : null,
          {width: containerWidth},
        ]}
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
              isChecked={isChecked}
              size={deviceWidth * 0.05}
              fillColor="#FFFFFF"
              unfillColor="#FFFFFF"
              iconComponent={
                isChecked ? (
                  <FontAwesomeIcon
                    name="check"
                    size={deviceWidth * 0.04}
                    color={'#7F00FF'}
                  />
                ) : null
              }
              iconStyle={{
                borderRadius: 1,
              }}
              onPress={() => onPress(!isChecked)}
              innerIconStyle={{
                borderWidth: deviceWidth * 0.005,
                borderRadius: deviceWidth * 0.01,
                borderColor: 'transparent',
              }}
              style={{
                borderRadius: deviceWidth * 0.01,
                marginTop: deviceWidth * 0.005,
              }}
            />
          </View>
          {/* Both text context goes here */}
          <View style={styles.textContent}>
            <Text style={styles.taskText}>{task}</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          {/* Toggle the icon */}
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={toggleAccordion}>
            <Icon
              name={isExpanded ? 'up' : 'down'}
              size={deviceWidth * 0.04}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>
        {isExpanded && (
          <Text style={styles.additionalContent}>{additionalContent}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  expandedContainer: {
    height: 120,
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
    paddingHorizontal: '4%',
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
    fontSize: Dimensions.get('window').width * 0.05,
    color: '#fff',
    marginLeft: '4%',
  },
  timeText: {
    color: '#fff',
    marginLeft: '4%',
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
    paddingHorizontal: '5%',
    paddingTop: 10,
    color: '#fff',
    marginLeft: '12%',
  },
});

export default CompleteTaskListItem;
