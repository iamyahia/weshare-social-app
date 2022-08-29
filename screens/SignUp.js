import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FormInput from '../components/FormInput';
//! components
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
//! packages
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//! components
import {AuthContext} from '../navigation/AuthProvider';
import Login from './Login';

const SignUp = ({navigation}) => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header_background}>
          {/* //! arrow left */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{position: 'absolute', top: 15, left: 20}}>
            <Image
              source={require('../assets/arrowLeft.png')}
              style={{width: 50, height: 50}}
            />
            {/* <Icon
              name="arrow-left-thin"
              color="red"
              style={styles.go_back_icon}
            /> */}
          </TouchableOpacity>
          <View style={styles.header_Items_container}>
            <Image
              source={require('../assets/logo_without_text.png')}
              style={{width: 50, height: 50}}
            />
            <Text style={styles.sign_text}>Sign Up</Text>
            <Text style={styles.info_text}>
              Sign up to learn about exciting things around of you
            </Text>
          </View>
        </View>

        {/* //* form inputs */}
        <View style={{alignItems: 'center', marginTop: -45}}>
          <View
            style={{backgroundColor: '#fff', width: '85%', borderRadius: 20}}>
            <FormInput
              labelValue={userName}
              onChangeText={value => setUserName(value)}
              iconName="person"
              placeHolder="Full Name"
            />
            <FormInput
              labelValue={email}
              onChangeText={value => setEmail(value)}
              iconName="email"
              placeHolder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              labelValue={password}
              onChangeText={value => setPassword(value)}
              iconName="lock"
              placeHolder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
            />
            <FormInput
              labelValue={confirmPassword}
              onChangeText={value => setConfirmPassword(value)}
              iconName="lock"
              placeHolder="Confirm Password"
              autoCapitalize="none"
              secureTextEntry={true}
            />
            {/* //! submit button */}
            <FormButton
              title="Sign Up"
              onPress={() => {
                if (!email || !password || !confirmPassword) {
                  return alert('Please fill in all of the blank inputs ');
                }
                if (password !== confirmPassword) {
                  return alert('Passwords do not match');
                }

                return register(email, password);
              }}
            />
            {/* //! already have an accout   */}
            <View style={styles.haveAccount}>
              <Text>already have an accout? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{color: '#7972E6'}}>Sign In</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                //   flexDirection: 'row',
                // maxWidth: '30%',
                marginLeft: 20,
                marginRight: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginVertical: 20,
                justifyContent: 'center',
              }}>
              <Text style={styles.fonts}>By sign in up you accept our</Text>
              <TouchableOpacity>
                <Text style={[styles.fonts, styles.color]}>
                  Terms of Services{' '}
                </Text>
              </TouchableOpacity>
              <Text style={styles.fonts}>and </Text>
              <TouchableOpacity>
                <Text style={[styles.fonts, styles.color]}>privecy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* //! staright line */}
        <View style={styles.text_line_container}>
          <View style={styles.text_line_view}>
            <View style={styles.line} />
            <View>
              <Text style={styles.current_text_line}> Or connect using </Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>
        </View>

        {/* //! social media section */}

        {Platform.OS === 'android' ? (
          <View
            style={{
              alignItems: 'center',
              marginBottom: 30,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 20,
                width: '85%',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <SocialButton iconName="facebook-square" color="#3b5998" />
              <SocialButton iconName="google" color="#FFA500" />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DFE0E4',
    flex: 1,
  },
  fonts: {
    fontFamily: 'Inter-Regular',
  },
  color: {
    color: '#7972E6',
  },
  //!   purple header
  marginLeftRigh: {},
  header_background: {
    backgroundColor: '#7972E6',
    height: 250,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    alignItems: 'center',
  },
  header_Items_container: {
    marginTop: 50,
    alignItems: 'center',
  },
  sign_text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 15,
  },
  info_text: {
    color: '#fff',
    marginRight: 'auto',
  },

  //! already have an accout */}
  haveAccount: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  // !   straight line with text
  text_line_container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  text_line_view: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  current_text_line: {width: 125, textAlign: 'center'},
  //! arrow left
  go_back_icon: {
    color: '#fff',
    fontSize: 50,
  },
});

export default SignUp;
