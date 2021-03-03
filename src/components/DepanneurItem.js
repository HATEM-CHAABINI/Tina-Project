import React from 'react'
import {TouchableOpacity, View, Text, Image} from 'react-native';
import Location from '../components/svgicons/Location';
import Phone from '../components/svgicons/Phone';
import Email from '../components/svgicons/Email';
import {em} from '../common/constants'
import { SvgCssUri } from 'react-native-svg';

export default DepanneurItem = ({image, title, location, phone, email, onPress}) => (
    <TouchableOpacity style={styles.ActionButton} onPress={onPress}>
         <View style={{flexDirection:"row"}}>
      { image.uri.substr(image.uri.length - 3 ) =="svg" ?
         <SvgCssUri
         style={styles.ItemImage} 
    uri={image.uri}
  /> :         <Image style={styles.ItemImage} source={{uri: image.uri}} resizeMode= {'stretch'}></Image>
}
                   <View style={styles.ContentWrapper}>
                <Text style={styles.TitleText}>{title}</Text>

                <View style={styles.ItemWrapper}>
                    <Location width={15*em} height={15*em} />
                    <Text style={styles.ItemText}>{location}</Text>
                </View>

                <View style={styles.ItemWrapper}>
                    <Phone width={15*em} height={15*em} />
                    <Text style={styles.ItemText}>{phone}</Text>
                </View>

                <View style={styles.ItemWrapper}>
                    <Email width={15*em} height={15*em} />
                    <Text style={styles.ItemText}>{email}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
)

const styles = {
    ActionButton: {
        overflow: 'hidden',
        borderRadius: 20*em,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding:18*em,
        justifyContent: 'center',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        marginTop: 8*em,
        marginBottom: 8*em,
        marginLeft: 15*em,
        marginRight: 15*em,
        elevation: 20,
      },

    ContentWrapper:{
        flex: 1, 
        flexDirection:"column",
        marginLeft: 15*em
    },

    ItemImage:{
        width: 48*em, 
        height: 48*em, 
        borderRadius: 24*em
    },
    
    ItemWrapper:{
        flexDirection:"row", 
        alignItems:"center", 
        marginTop: 10*em
    },

    TitleText:{
        fontSize: 16*em, 
        color:"#251b4d", 
        fontFamily:"Merriweather-Black"
    },

    ItemText:{
        color:"#928da6", 
        fontSize: 12*em, 
        paddingLeft: 8*em, 
        fontFamily:"OpenSans-Regular"
    }
}