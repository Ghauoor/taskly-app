import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const CustomDrawer = props => {
  const {user} = useSelector(state => state.userState.user);
  const drawerStatus = useDrawerStatus();

  const handleDrawerClose = () => {
    if (drawerStatus === 'open') {
      props.navigation.closeDrawer();
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9C00FF', '#EF65DC']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.gradientBackground}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{backgroundColor: 'transparent'}}>
          {/* Circular Icon */}
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handleDrawerClose}>
            <Icon name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          {/* Circular Image Avatar */}
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require('../../assets/images/drawer-bg-image.png')}
              style={styles.backgroundImage}>
              <View style={styles.avatarContainer}>
                <Image source={{uri: user.photo}} style={styles.profileImage} />
              </View>
            </ImageBackground>
            <Text style={styles.nameText}>{user.name}</Text>
          </View>
          <View style={{marginLeft: 25}}>
            <DrawerItemList {...props} />
          </View>
          {/* Version Text */}
          <View>
            <Text
              style={{
                fontSize: 12,
                color: '#ffffff',
                marginLeft: 45,
                marginTop: 20,
              }}>
              Version: 3.6
            </Text>
          </View>
        </DrawerContentScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#fff1ff8d',
    borderWidth: 2,
    margin: 10,
  },
  imageContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  backgroundImage: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    height: 85,
    width: 85,
    borderRadius: 65,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nameText: {
    fontSize: 30,
    marginTop: 30,
    marginLeft: 25,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Sofia Pro',
  },
});

export default CustomDrawer;
