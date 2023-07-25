import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import GradientButton from '../components/GradientButton';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/slices/user';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

let {width, height} = Dimensions.get('window');

const WelcomeScreen = () => {
  const dispatch = useDispatch();

  const checkUser = async userId => {
    try {
      const userSnapshot = await firestore()
        .collection('Users')
        .doc(userId)
        .get();

      return userSnapshot.exists;
    } catch (error) {
      // Handle the error...
      console.log('Error checking user:', error);
      return false;
    }
  };

  const createUserInFirestore = async userInfo => {
    try {
      const user = {
        id: userInfo.user.id,
        name: userInfo.user.name,
        email: userInfo.user.email,
        photoUrl: userInfo.user.photo,
        //more fields...
      };

      console.log("I'm user userInfo id: ", userInfo.user.id);
      await firestore().collection('Users').doc(userInfo.user.id).set(user);

      // dispatch the user data to Redux
      // dispatch(setUser(user));
    } catch (error) {
      // Handle the error...
      console.log('Error creating user:', error);
    }
  };

  GoogleSignin.configure({
    offlineAccess: false,
    webClientId:
      '577829973059-hjsg5velr09kall8s2dk4m8sojb7clfn.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const userExists = await checkUser(userInfo.user.id);

      // set data to the redux user 
      dispatch(setUser(userInfo));

      if (!userExists) {
        await createUserInFirestore(userInfo);

        console.log('New user created. Navigating to Home screen...');
      } else {
        console.log('User already exists. Navigating to Home screen...');
      }

      const {idToken} = userInfo;
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredentials);

      return userInfo;
    } catch (error) {
      console.log('Error is ', error);
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
    marginTop: 5,
    height: height * 0.65,
    width: width,
    marginBottom: 10,
    resizeMode: 'contain',
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
