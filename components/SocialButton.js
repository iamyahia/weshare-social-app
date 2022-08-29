import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({iconName, color, ...rest}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
      }}
      {...rest}>
      <Icon name={iconName} color={color} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 50,
    margin: 20,
  },
});

export default SocialButton;
