import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ErrorDialog = ({visible, message, onClose}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.dialog}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <LinearGradient
              style={styles.button}
              colors={['#F44336', '#D32F2F']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.buttonText}>OK</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    width: '60%',
    alignItems: 'flex-end',
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    marginRight: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default ErrorDialog;
