import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Header = ({
  name,
  onPress,
  containerStyle,
  iconStyle,
  textStyle,
  iconColor,
}) => {
  const handleNavigation = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={{...styles.container, containerStyle}}>
      <TouchableOpacity
        onPress={handleNavigation}
        style={{...styles.iconContainer, iconStyle}}>
        <Icon name="arrowleft" size={30} color={iconColor} />
      </TouchableOpacity>
      <Text style={[styles.title, textStyle]}>{name}</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    padding: 10,
  },
  iconContainer: {
    marginRight: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fff',
  },
};

export default Header;
