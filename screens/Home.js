import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
//! packages
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

//! components
import PostCard from '../components/PostCard';

const Posts = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: 'https://random.imagecdn.app/500/150',
    postTime: '4 mins ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'https://random.imagecdn.app/500/150',
    liked: true,
    likes: '14',
    comments: '5',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: 'https://random.imagecdn.app/500/150',
    postTime: '2 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '8',
    comments: '0',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: 'https://random.imagecdn.app/500/150',
    postTime: '1 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'https://random.imagecdn.app/500/150',
    liked: true,
    likes: '1',
    comments: '0',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: 'https://random.imagecdn.app/500/150',
    postTime: '1 day ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'https://random.imagecdn.app/500/150',
    liked: true,
    likes: '22',
    comments: '4',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: 'https://random.imagecdn.app/500/150',
    postTime: '2 days ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '0',
    comments: '0',
  },
];

const Home = ({navigation}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPost = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapShot => {
          querySnapShot.forEach(doc => {
            const {post, postImage, postTime, likes, comments, userId} =
              doc.data();

            list.push({
              id: doc.id,
              userId,
              userName: 'Test App',
              userImg: 'https://random.imagecdn.app/500/150',
              postTime,
              post,
              postImage,
              liked: false,
              likes,
              comments,
            });
          });

          // console.log('Posts: ', list);
          setPosts(list);
          if (loading) setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log('cant fetch data in cloud firebase', err);
    }
  };

  const handleDelete = postId => {
    Alert.alert('Deleted article!', 'Are you sure?', [
      {
        text: 'Cancle',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => deletePost(postId),
      },
    ]);
  };

  const deletePost = async postId => {
    await firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImage} = documentSnapshot.data();

          if (postImage !== null) {
            const storageRef = storage().refFromURL(postImage);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                deleteFirestoreData(postId);
                setDeleted(true);
              })
              .catch(err => {
                console.log('err: ', err);
              });
          } else {
            //* if the post image is not available
            deleteFirestoreData(postId);
            setDeleted(true);
          }
        }
      })
      .catch(err => {
        console.log('we have error to delete article, err:', err);
      });
  };

  const deleteFirestoreData = async postId => {
    await firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert('Post deleted!', 'your post has been deleted successfully');
      })
      .catch(err => {
        console.log('cant delete post, err: ', err);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    fetchPost();
    setDeleted(false);
  }, [deleted]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
          <View style={{width: '80%'}}>
            <SkeletonPlaceholder>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 60, height: 60, borderRadius: 50}} />
                <View style={{marginLeft: 20}}>
                  <View style={{width: 120, height: 20, borderRadius: 4}} />
                  <View
                    style={{
                      marginTop: 6,
                      width: 80,
                      height: 20,
                      borderRadius: 4,
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: 10, marginBottom: 30}}>
                <View style={{width: 300, height: 20, borderRadius: 5}} />
                <View
                  style={{
                    width: 250,
                    height: 20,
                    borderRadius: 5,
                    marginTop: 6,
                  }}
                />
                <View
                  style={{
                    width: 350,
                    height: 200,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                />
              </View>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 60, height: 60, borderRadius: 50}} />
                <View style={{marginLeft: 20}}>
                  <View style={{width: 120, height: 20, borderRadius: 4}} />
                  <View
                    style={{
                      marginTop: 6,
                      width: 80,
                      height: 20,
                      borderRadius: 4,
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: 10, marginBottom: 30}}>
                <View style={{width: 300, height: 20, borderRadius: 5}} />
                <View
                  style={{
                    width: 250,
                    height: 20,
                    borderRadius: 5,
                    marginTop: 6,
                  }}
                />
                <View
                  style={{
                    width: 350,
                    height: 200,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={posts}
          renderItem={({item}) => (
            <PostCard
              item={item}
              onDelete={handleDelete}
              onPress={() =>
                navigation.navigate('HomeProfile', {userId: item.userId})
              }
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default Home;
