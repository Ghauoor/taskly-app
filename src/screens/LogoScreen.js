import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import GradientButton from '../components/GradientButton';

const {width, height} = Dimensions.get('window');
const LogoScreen = () => {
  return (
    <View style={styles.container}>
      {/* Image container */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/side-line.png')} />
      </View>
      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.logoText}>Logo Here</Text>
      </View>
      <View>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logoImage}
        />
      </View>
      {/* Dots Image */}
      <View style={styles.dotsImageContainer}>
        <ImageBackground
          source={require('../../assets/images/bg-dots.png')}
          style={styles.dotsImage}
          resizeMode="contain">
          {/* Head Text */}
          <Text style={styles.dotsTextHeadLine}>Reminders made simple</Text>
          {/* SubText Container */}

          <View style={styles.textSubTextContainer}>
            <Text style={styles.textSubText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            {/* Button */}
            <View style={styles.button}>
              <GradientButton
                colors={['#A100FE', '#F300F0']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                text="Get Started"
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 5,
  },
  imageContainer: {
    marginLeft: width * 0.6,
  },
  logoText: {
    color: '#111111',
    fontWeight: 'bold',
    fontSize: 24,
  },
  logoImage: {
    width: width * 0.6,
    height: height * 0.4,
  },
  dotsImageContainer: {
    marginTop: 30,
    position: 'absolute',
    top: height * 0.2,
    left: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsImage: {
    // width: '90%',
    // height: '100%',
    flex: 1,
    width: width * 0.7,
    height: height * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsTextHeadLine: {
    color: '#111111',
    fontSize: 18,
    marginTop: 120,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSubTextContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  textSubText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
  },
  button: {
    marginTop: 30,
    marginBottom: 10,
  },
});

export default LogoScreen;
