import React from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

const ProfileView = () => {
  const {user} = useSelector(state => state.userState.user);

  const {width, height} = Dimensions.get('window');

  const responsiveProfileImageSize = Math.min(width * 0.2, height * 0.2);
  const responsiveImageSize = Math.min(width * 0.5, height * 0.1);
  const responsiveTextSize = Math.min(width * 0.5, 22);

  return (
    <LinearGradient
      colors={['#8A00FF', '#BD00FF']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.rowContainer}>
          <Image
            source={{uri: user.photo}}
            style={[
              styles.profileImage,
              {
                width: responsiveProfileImageSize,
                height: responsiveProfileImageSize,
              },
            ]}
            resizeMode="contain"
          />
          <Text style={[styles.text, {fontSize: responsiveTextSize}]}>
            {user.name}
          </Text>
        </View>
        <Image
          source={require('../../assets/images/bubble.png')}
          style={[
            styles.image,
            {width: responsiveImageSize, height: responsiveImageSize},
          ]}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '23%',
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
    marginHorizontal: '5%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    marginTop: '15%',
    marginRight: '8%',
  },
  image: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    right: 1,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: -10,
    marginTop: '15%',
  },
});

export default ProfileView;
