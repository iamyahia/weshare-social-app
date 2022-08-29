import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const FormButton = ({title, ...rest}) => {
  return (
    <TouchableOpacity style={styles.background} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#7972E6',
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
  },
});

export default FormButton;
