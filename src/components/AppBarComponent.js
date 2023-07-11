import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, Menu} from 'react-native-paper';

const AppBarComponent = ({
  isMenuOpen,
  handleToggleMenu,
  handleCloseMenu,
  handleSearch,
  title,
  style,
}) => {
  return (
    <Appbar.Header
      style={[{elevation: 0, backgroundColor: 'transparent'}, style]}>
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
      <Appbar.Action
        icon="magnify"
        onPress={handleSearch}
        color="#161616"
        size={30}
        style={{padding: 8}}
      />
    </Appbar.Header>
  );
};

export default AppBarComponent;
