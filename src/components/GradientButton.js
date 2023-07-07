import React from 'react';
import {
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

let {width, height} = Dimensions.get('window');

const GradientButton = ({
  colors,
  start,
  end,
  text,
  logoSource,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={styles.buttonGradient}>
        {logoSource && <Image source={logoSource} style={styles.logo} />}
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGradient: {
    width: width * 0.88,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default GradientButton;
