import {View, Button, Text} from 'react-native';
import React from 'react';

const Onboarding = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Onboarding Screen</Text>
      <Button
        title="go to Detail"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default Onboarding;
