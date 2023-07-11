import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppBarComponent from '../components/AppBarComponent';
import ProfileView from '../components/ProfileView';
import SettingsCard from '../components/SettingsCard';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <AppBarComponent
        title="Settings"
        style={styles.appBar}
        showSearchIcon={false}
      />
      <View style={styles.profileView}>
        <ProfileView />
        <SettingsCard
          title="Information"
          image={require('../../assets/images/info-logo.png')}
        />
        <SettingsCard
          title="Profile"
          image={require('../../assets/images/profile-logo.png')}
        />
        <SettingsCard
          title="Like"
          image={require('../../assets/images/like-logo.png')}
        />
        <SettingsCard
          title="Share"
          image={require('../../assets/images/share.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    paddingHorizontal: 16,
  },
  profileView: {
    flex: 1,
    alignItems: 'center',
  },
});

export default SettingScreen;
