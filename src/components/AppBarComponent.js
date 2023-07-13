import React from 'react';
import {Appbar, Menu} from 'react-native-paper';
import {Image, Text} from 'react-native';

const AppBarComponent = ({
  isMenuOpen,
  handleToggleMenu,
  handleCloseMenu,
  handleSearch,
  title,
  style,
  showSearchIcon,
  additionalIcons,
}) => {
  return (
    <Appbar.Header
      style={[
        {
          elevation: 0,
          backgroundColor: 'transparent',
        },
        style,
      ]}>
      <Menu
        visible={isMenuOpen}
        onDismiss={handleCloseMenu}
        anchor={
          <Appbar.Action
            icon="menu"
            onPress={handleToggleMenu}
            color="#161616"
            size={30}
            style={{marginLeft: -8}}
          />
        }
      />
      <Appbar.Content
        title={title}
        titleStyle={{
          color: '#161616',
          fontWeight: 'bold',
          fontSize: 22,
          marginLeft: 10,
        }}
      />
      {additionalIcons &&
        additionalIcons.map((icon, index) => {
          if (icon.type === 'image') {
            return (
              <Image
                key={`image_${index}`}
                source={require('../../assets/images/clock-icon.png')}
                style={{height: 20, width: 40, resizeMode: 'contain'}}
              />
            );
          } else {
            return (
              <Appbar.Action
                key={index}
                icon={icon.name}
                onPress={icon.onPress}
                color={icon.color || '#161616'}
                size={icon.size || 30}
                style={icon.style || {padding: 8}}
              />
            );
          }
        })}
      {showSearchIcon && (
        <Appbar.Action
          icon="magnify"
          onPress={handleSearch}
          color="#161616"
          size={30}
          style={{padding: 8}}
        />
      )}
    </Appbar.Header>
  );
};

export default AppBarComponent;
