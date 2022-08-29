import {View, Text} from 'react-native';
import React from 'react';
//!packages
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlusIcon from 'react-native-vector-icons/Feather';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
//! components
import Home from '../screens/Home';
import Message from '../screens/Message';
import Profile from '../screens/Profile';
import AddPost from '../screens/AddPost';
import EditProfile from '../screens/EditProfile';
import Chat from '../screens/Chat';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen
        name="We Share"
        component={Home}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#2e64e5',
            // fontFamily: 'Inter-Regular',
            // fontSize: 10,
          },
          headerRight: () => (
            <View>
              <PlusIcon
                name="plus"
                size={22}
                color="#2e64e5"
                onPress={() => navigation.navigate('AddPost')}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#2e64e515',
            // shadowColor: '#2e64e515',
          },
          // headerBackTitleVisible: false,
          // headerBackImage: () => (
          //   <View style={{marginLeft: 15}}>
          //     <Icon name="arrow-back" size={25} color="#2e64e5" />
          //   </View>
          // ),
        }}
      />

      <Stack.Screen
        name="HomeProfile"
        component={Profile}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            // shadowColor: '#2e64e515',
          },
          // headerBackTitleVisible: false,
          // headerBackImage: () => (
          //   <View style={{marginLeft: 15}}>
          //     <Icon name="arrow-back" size={25} color="#2e64e5" />
          //   </View>
          // ),
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile View"
      component={Profile}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={Message} />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Message"
        component={MessageStack}
        options={({route}) => ({
          // tabBarVisible: getTabBarVisibility(route),
          // tabBArVisible: route.state && route.state.index === 0,

          tabBarIcon: ({color, size}) => (
            <Icon name="message" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
