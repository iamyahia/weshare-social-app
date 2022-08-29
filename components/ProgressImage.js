import {View, StyleSheet, Animated} from 'react-native';

import React, {Component} from 'react';

export class ProgressImage extends Component {
  default_animated_image = new Animated.Value(0);
  image_animated = new Animated.Value(0);

  handleDefaultImageLoad = () => {
    Animated.timing(this.default_animated_image, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  handleImageLoad = () => {
    Animated.timing(this.image_animated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {default_image_source, source, style, ...props} = this.props;
    return (
      <View>
        <Animated.Image
          source={default_image_source}
          style={[style, {opacity: this.default_animated_image}]}
          onLoad={this.handleDefaultImageLoad}
          blurRadius={1}
          {...props}
        />

        <Animated.Image
          source={source}
          style={[style, {opacity: this.image_animated}, styles.imaegOverlay]}
          onLoad={this.handleImageLoad}
          {...props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
  },
  imaegOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default ProgressImage;
