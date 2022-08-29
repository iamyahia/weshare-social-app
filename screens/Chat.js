import {View, Text, ScrollView} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
//! packages
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'bye bye habibi',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'bye Earth',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#4ad197',
          },
          left: {
            backgroundColor: '#d9d9d9',
          },
        }}
        textStyle={{
          right: {
            color: '#fefefe',
          },
          left: {
            color: '#4e4e4e',
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={{marginRight: 5, marginBottom: 2}}>
          <Icon name="send-circle" size={36} color="#4ad197" />
        </View>
      </Send>
    );
  };

  const scroll_to_bottom_fn = () => {
    return <FontAwesomeIcon name="angle-double-down" size={32} color="#333" />;
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scroll_to_bottom_fn}
    />
  );
};

export default Chat;
