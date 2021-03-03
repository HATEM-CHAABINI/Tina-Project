import React from 'react'
import {TouchableOpacity, View, Text, Image} from 'react-native';
import ArrowSmall from './svgicons/ArrowSmall';
import { Actions } from 'react-native-router-flux';
import {em} from '../common/constants'

export default FAQItem = ({id, title, onPress}) => {
    return (<TouchableOpacity onPress={onPress}>
        <View style={styles.mainWrapper}>            
            <Text style={styles.titleText}>{title}</Text>
            <ArrowSmall width={14*em} height={14*em} />
        </View>
    </TouchableOpacity>)
}

const styles = {
      mainWrapper:{
        flexDirection:"row", 
        alignItem:"center", 
        justifyContent:"center", 
        alignItems:"center", 
        paddingLeft: 17*em, 
        paddingRight:17*em, 
        paddingTop:18*em, 
        paddingBottom:18*em
      },

      titleText:{
        marginLeft: 15*em, 
        fontSize: 13*em, 
        flex: 1, 
        color:"#251b4d", 
        fontFamily:"OpenSans-SemiBold"
      },
}