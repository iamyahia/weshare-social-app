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
  Platform,
} from 'react-native';
import React, {useState, useContext} from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
//! components
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login, googleLogin, fbLogin} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header_background}>
          <View style={styles.header_Items_container}>
            <Image
              source={require('../assets/logo_without_text.png')}
              style={{width: 50, height: 50}}
            />
            <Text style={styles.sign_text}>Sign In</Text>
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
            <FormButton
              title="Sign In"
              onPress={() => {
                if (!email) {
                  return alert('please, type your email');
                }
                if (!password) {
                  return alert('please, type your password');
                }

                <Icon name="loading1" />;

                return login(email, password);
              }}
            />
            {/* //! already have an accout   */}
            <View style={styles.haveAccount}>
              <Text>Don't have an accout? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={{color: '#7972E6'}}>Create here</Text>
              </TouchableOpacity>
            </View>
            {/* <View
              style={{
                //   flexDirection: 'row',
                //   maxWidth: '30%',
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
            </View> */}
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
              <SocialButton
                iconName="facebook-square"
                color="#3b5998"
                onPress={() => fbLogin().catch(err => console.log(err))}
              />
              <SocialButton
                iconName="google"
                color="#FFA500"
                onPress={() => googleLogin()}
              />
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
    marginBottom: 10,
  },
  //!   straight line with text
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
});

export default Login;
