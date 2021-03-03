import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

const MenuItem = (props) => (
  <TouchableOpacity
    style={styles.container}
    disabled={props.disabled}
    onPress={props.onPress}
  >
    <View style={styles.titleContainer}>
      <Image
        source={props.image}
        style={[
          styles.rightImage,
          { opacity: props.disabled ? 0.5: 1 }
        ]}
      />
      <Text style={[styles.title, {color: props.disabled ? '#BFBFC4' : '#36384A'}]}>
        {props.title}
      </Text>
    </View>
    <View>
      {props.subtitle &&
        <Text style={[styles.subTitle, {color: props.disabled ? '#BFBFC4' : '#36384A'}]}>
          {props.subtitle}
        </Text>
      }
    </View>
  </TouchableOpacity>
)

const styles = {
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingVertical: 15,
  },
  titleContainer: {
    marginRight: 10, flexDirection: 'row'
  },
  rightImage: {
    width: 20 * em,
    marginRight: 5,
    marginLeft: 5,
    resizeMode: 'contain',
    tintColor: '#4a97ee'
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 15
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '300'
  }
}

export default MenuItem
