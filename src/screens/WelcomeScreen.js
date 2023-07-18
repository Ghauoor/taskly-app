import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import GradientButton from '../components/GradientButton';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

let {width, height} = Dimensions.get('window');

const WelcomeScreen = () => {
  GoogleSignin.configure({
    webClientId:
      '1971063694-rfp8ju9qdlfvhv56gbeqje1cbdi5pp1q.apps.googleusercontent.com',
  });
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      // const userInfo = await GoogleSignin.signIn();
      // setState({userInfo});
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
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
            onPress={() => signIn()}
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
