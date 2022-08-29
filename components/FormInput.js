import {TextInput, StyleSheet, View, Text} from 'react-native';
import React from 'react';
//! packages
import Icon from 'react-native-vector-icons/MaterialIcons';

const FormInput = ({placeHolder, iconName, labelValue, ...rest}) => {
  return (
    <View style={styles.input_container}>
      <View style={styles.items_view}>
        <View style={styles.icon_view}>
          <Icon name={iconName} style={styles.icon} />
        </View>
        <TextInput
          value={labelValue}
          placeholder={placeHolder}
          numberOfLines={1}
          style={{marginLeft: 5, flex: 1}}
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input_container: {
    // width: '85%',
    // margin: 15,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  items_view: {
    flexDirection: 'row',
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
  },
  icon_view: {
    justifyContent: 'center',
  },
  icon: {
    borderRightColor: 'black',
    borderRightWidth: 0.5,
    paddingRight: 5,
    paddingLeft: 10,
    opacity: 0.5,
    fontSize: 25,
  },
});
export default FormInput;
