import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
//! packages
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import moment from 'moment';
//! components
import PrgImage from './ProgressImage';
import {AuthContext} from '../navigation/AuthProvider';

let x = 0;
x++;

const PostCard = ({item, onDelete, onPress}) => {
  let likeIcon = item.liked ? 'heart' : 'heart-outline';
  let likeIconColor = item.liked ? '#2e64e5' : '#333';
  let commentCount = null;

  const {user} = useContext(AuthContext);

  if (item.comments === '0') {
    item.comments = '';
  }
  if (item.likes === '0') {
    item.likes = ' ';
  }

  return (
    <View style={styles.card}>
      <View style={{padding: 10}}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: item.userImg,
            }}
            style={styles.userImage}
          />
          <View style={styles.userInfo_container}>
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.userName}>{item.userName}</Text>
            </TouchableOpacity>
            <Text>{moment(item.postTime.toDate()).fromNow()}</Text>
          </View>
        </View>
        <Text style={{marginTop: 10}}>{item.post} </Text>
      </View>
      {/* //! image */}
      {item.postImage !== null ? (
        <View>
          {/* {console.log('item Post image', item.postImage)} */}
          <PrgImage
            default_image_source={require('../assets/default-img.jpg')}
            source={{uri: item.postImage}}
            style={{width: '100%', height: 250}}
            resizeMode="cover"
          />
        </View>
      ) : (
        ''
      )}

      {/* //! like/comment button */}
      <View style={styles.button_container}>
        <Interaction active={item.liked}>
          <Icon
            name={likeIcon}
            style={styles.heart_icon}
            color={likeIconColor}
          />
          <InteractionText style={styles.like_text}>
            {item.likes} Like
          </InteractionText>
        </Interaction>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Icon name="md-chatbubble-outline" style={styles.heart_icon} />

          <Text style={styles.like_text}>{item.comments} Comments</Text>
        </TouchableOpacity>
        {/* //! check Delete/Edit button */}
        {user.uid === item.userId ? (
          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Icon name="md-trash-bin" style={styles.heart_icon} color="red" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  card: {
    backgroundColor: '#f4f4f4',
    marginVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  //! userInformation style
  userInfo_container: {
    // alignItems: 'center',

    justifyContent: 'center',
    marginLeft: 15,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Inter-Regular',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  // ! like/comment btn
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  interaction_container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'row',
    backgroundColor: '#2e64e515',
  },
  heart_icon: {
    fontSize: 25,
  },
  like_text: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

const Interaction = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${props => (props.active ? '#2e64e515' : 'transparent')};

  align-items: center;
  border-radius: 5px;
  padding: 2px 5px;
`;

const InteractionText = styled.Text`
  margin-left: 3px;
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.active ? '#2e64e5' : '#333')};
`;
