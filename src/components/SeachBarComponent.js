import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchbarComponent = ({onClose, setSearchText, searchText}) => {
  const onChangeSearch = query => setSearchText(query);

  const handleClearSearch = () => {
    setSearchText('');
    onClose();
  };

  return (
    <React.Fragment>
      <Searchbar
        placeholder="Search"
        onChangeText={e => setSearchText(e)}
        value={searchText}
        onIconPress={handleClearSearch}
        // icon={({color, size}) => (
        //   <Icon name="close" size={size} color={color} />
        // )}
      />
    </React.Fragment>
  );
};

export default SearchbarComponent;
