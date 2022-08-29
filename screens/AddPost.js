import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext} from 'react';
//! packages
import styled from 'styled-components';
import {FloatingAction} from 'react-native-floating-action';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../navigation/AuthProvider';

const AddPostScreen = ({navigation}) => {
  const actions = [
    {
      text: 'Take Photo',
      icon: require('../assets/icons/camera_icon.png'),
      name: 'takePhoto',
      position: 1,
      onclick() {
        console.warn('hi');
      },
    },
    {
      text: 'Choose Photo',
      icon: require('../assets/icons/gallery_icon.png'),
      name: 'choosePhoto',
      position: 2,
    },
  ];

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userPost, setUserPost] = useState(null);

  const {user} = useContext(AuthContext);
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();

    firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        post: userPost,
        postImage: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        likes: null,
        comments: null,
      })
      .then(() => {
        setUserPost(null);
        setImage(null);
        Alert.alert(
          'Post Published!!',
          'Your Post has been Published successfully!',
        );
      })
      .catch(err =>
        console.log(
          'something went wrong with added post to fireSotre, please check your code again, Err:',
          err,
        ),
      );
  };

  const uploadImage = async () => {
    if (image === null) {
      return null;
    }

    const uploadUri = image;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // add timestamp to file name
    const extention = fileName.split('.').pop();
    const name = fileName.split('.').slice(0, -1).join('.');
    fileName = name + Date.now() + '.' + extention;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${fileName}`);
    const task = storageRef.putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferred(
        Math.round(
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
        ),
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);

      return url;
    } catch (err) {
      console.log(err);
      return null;
    }

    setImage(null);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <InputWrapper>
        {image != null ? (
          <Image
            source={{uri: image}}
            style={{width: '100%', height: 250, marginBottom: 15}}
          />
        ) : null}

        <InputField
          placeholder="what's your mind?"
          multiline
          numberOfLine={4}
          value={userPost}
          onChangeText={value => setUserPost(value)}
        />
        {uploading ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => submitPost()}
            style={{
              padding: 5,
              backgroundColor: '#2e64e515',
              width: '20%',
              borderRadius: 5,
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#2e64e5',
                fontWeight: 'bold',
              }}>
              POST
            </Text>
          </TouchableOpacity>
        )}
      </InputWrapper>

      <View
        style={{
          width: '100%',
        }}>
        <FloatingAction
          actions={actions}
          position="right"
          onPressItem={name => {
            if (name === 'takePhoto') return takePhotoFromCamera();
            if (name === 'choosePhoto') return choosePhotoFromLibrary();
          }}
          color="#2e64e5"
        />
      </View>
    </View>
  );
};

export default AddPostScreen;

const InputWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #2e64e515;
`;

const InputField = styled.TextInput`
  justify-content: center;
  align-items: center;
  font-size: 24px;
  text-align: center;
  width: 90%;
`;
