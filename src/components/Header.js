import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Header = props => {
  const handleNavigation = () => {
    if (props.onPress) {
      props.onPress();
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        padding: 10,
      }}>
      <TouchableOpacity onPress={handleNavigation} style={{marginRight: 15}}>
        <Icon name="arrowleft" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={{fontWeight: 'bold', fontSize: 25, color: '#fff'}}>
        {props.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Header;
