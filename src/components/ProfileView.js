import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileView = () => {
  return (
    <LinearGradient
      colors={['#8A00FF', '#BD00FF']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.rowContainer}>
          <Image
            source={require('../../assets/images/profile-image.png')}
            style={styles.profileimage}
            resizeMode="contain"
          />
          <Text style={styles.text}>Olivia Mitchell</Text>
        </View>
        <Image
          source={require('../../assets/images/bubble.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '25%',
    width: '90%',
    marginTop: 20,
    borderRadius: 18,
    borderColor: '#707070',
    borderWidth: 1,
    overflow: 'hidden',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileimage: {
    width: 120,
    height: 120,
    marginTop: 20,
    marginRight: 10,
  },
  image: {
    height: 80,
    width: 80,
    marginTop: 6,
  },
  text: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: -10,
  },
});

export default ProfileView;
