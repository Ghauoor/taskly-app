import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
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
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  //* check if the user is already exist in the collection or not...
  const checkUser = async userId => {
    try {
      const userSnapshot = await firestore()
        .collection('Users')
        .doc(userId)
        .get();
      return userSnapshot.exists;
    } catch (error) {
      console.log('Error checking user:', error);
      return false;
    }
  };

  //* creating user in firebase
  const createUserInFirestore = async userInfo => {
    try {
      const user = {
        id: userInfo.user.id,
        name: userInfo.user.name,
        email: userInfo.user.email,
        photoUrl: userInfo.user.photo,
        //*more fields...
      };

      await firestore().collection('Users').doc(userInfo.user.id).set(user);
      // dispatch the user data to Redux
      // dispatch(setUser(user));
    } catch (error) {
      console.log('Error creating user:', error);
    }
  };

  //* google sign in config
  GoogleSignin.configure({
    offlineAccess: false,
    webClientId:
      '577829973059-hjsg5velr09kall8s2dk4m8sojb7clfn.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });

  //* method for google signin
  const signIn = async () => {
    try {
      //? set the activiy indicator
      setModalVisible(true);
      setLoading(true);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const userExists = await checkUser(userInfo.user.id);

      //? set data to the redux user
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

      //? remove the user
      setLoading(false);
      setModalVisible(false);

      return userInfo;
    } catch (error) {
      setLoading(false);
      setModalVisible(false);
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
    // main container
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/bg-welcome.png')}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>
          Complete Your Every Important Task
        </Text>
        <View style={styles.textSubTextContainer}>
          <Text style={styles.textSubText}>
            Seamless Task Management: Create, edit, and organize tasks
            effortlessly. Stay on top of your priorities with due dates and
            reminders
          </Text>
        </View>
        {/* Grdient button */}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        {/* ActivityIndicator */}
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#cb16cb" />
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(243, 234, 234, 0.5)',
  },
});

export default WelcomeScreen;
