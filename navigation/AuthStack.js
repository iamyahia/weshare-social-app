// In App.js in a new project

import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//! component
import Onboarding from '../screens/Onboarding';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();

function AuthStack() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '709128421437-n07ca2v12ptd1imsktk3mpc549kqi4pv.apps.googleusercontent.com',
    });
  }, []);

  return (
    // <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default AuthStack;
