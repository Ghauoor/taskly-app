import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import GradientButton from '../components/GradientButton';

let {width, height} = Dimensions.get('window');

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Images */}
      <Image
        source={require('../../assets/images/bg-welcome.png')}
        style={styles.image}
      />

      {/* Texts */}
      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>
          Complete Your Every Important Task
        </Text>
        <View style={styles.textSubTextContainer}>
          <Text style={styles.textSubText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>

        {/* Button Component*/}
        <View style={styles.buttonContainer}>
          <GradientButton
            colors={['#A100FE', '#F300F0']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            text="Continue With Google"
            logoSource={require('../../assets/images/google-logo.png')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 15,
    height: height * 0.65,
    width: width,
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textHeading: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000000',
    fontWeight: 'bold',
  },
  textSubTextContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  textSubText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
});

export default WelcomeScreen;
