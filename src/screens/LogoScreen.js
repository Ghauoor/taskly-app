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
const LogoScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Image container */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/side-line.png')} />
      </View>
      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.logoText}>Taskly</Text>
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
              Seamless Task Management: Create, edit, and organize tasks
              effortlessly. Stay on top of your priorities with due dates and
              reminders
            </Text>
            {/* Button */}
            <View style={styles.button}>
              <GradientButton
                colors={['#A100FE', '#F300F0']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                text="Get Started"
                onPress={() => navigation.navigate('WelcomeScreen')}
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
    fontSize: 34,
  },
  logoImage: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: 'contain',
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
    width: '90%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsTextHeadLine: {
    color: '#111111',
    fontSize: 18,
    marginTop: height * 0.1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSubTextContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textSubText: {
    fontSize: 16,
    textAlign: 'center',
    // alignContent: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    color: '#000000',
  },
  button: {
    marginTop: 50,
    marginRight: 20,
  },
});

export default LogoScreen;
