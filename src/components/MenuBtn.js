import React from 'react'
import { View, TouchableOpacity, TouchableHighlight, Text } from 'react-native'
import Burger from './svgicons/Burger';
import Close from './svgicons/Close';
import LeftArrow from './svgicons/LeftArrow';
import { em } from '../common/constants';

const styles = {
  menuBtn: {
    borderRadius: 19*em,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width:50*em,
    height:50*em,
    justifyContent: 'center',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 30
  },
}

export default MenuBtn = ({image, onPress}) => (
    <TouchableOpacity style={styles.menuBtn} onPress={onPress} elevation={2}>
        {image == "burger"? <Burger width={20*em} height={20*em}/>:(image == "close"? <Close />:<LeftArrow width={20*em} height={20*em} color={"#251b4d"}/>)}
    </TouchableOpacity>
)
