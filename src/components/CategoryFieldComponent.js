import React from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

let {width} = Dimensions.get('window');

const CategoryFieldComponent = ({colors, start, end, text}) => {
  return (
    <View>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={styles.buttonGradient}>
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGradient: {
    width: width * 0.89,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default CategoryFieldComponent;
