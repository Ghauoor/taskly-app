import React from 'react';
import {Text} from 'react-native';
import {View, StyleSheet, TextInput} from 'react-native';

const CreateTaskComponent = props => {
  // const [text, onChangeText] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      {/* Input field */}
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.text}
        editable={props.editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: '93%',
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#707070',
  },

  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111111',
  },
});

export default CreateTaskComponent;
