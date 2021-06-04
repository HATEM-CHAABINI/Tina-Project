import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { em } from '../common/constants'
import { Actions } from 'react-native-router-flux';

export default PostcodeItem = ({ id, title, code, onClick }) => {
  return (<TouchableOpacity onPress={onClick}>
    <View style={styles.mainWrapper}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  </TouchableOpacity>)
}

const styles = {
  mainWrapper: {
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15 * em,
    paddingRight: 15 * em,
    paddingTop: 20 * em,
    paddingBottom: 20 * em
  },

  titleText: {
    fontSize: 14 * em,
    flex: 1,
    color: "#251B4D",
    fontFamily: "OpenSans-Regular",
    textTransform: 'capitalize'
  },
}