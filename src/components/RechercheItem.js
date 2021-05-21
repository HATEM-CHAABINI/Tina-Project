import React from 'react'
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {colors, WIDTH, Q_TYPES, em} from '../common/constants';
import ArrowSmall from './svgicons/ArrowSmall';
import { Actions } from 'react-native-router-flux';

const renderIcons = (type) => {
    if (type == Q_TYPES.L){
      return (<Logiciel width={18*em} height={18*em} />)
    }else if (type == Q_TYPES.O){
      return (<Ordinateur width={18*em} height={18*em} />)
    }else if (type == Q_TYPES.P){
      return (<Periferique width={18*em} height={18*em} />)
    }else if (type == Q_TYPES.I){
      return (<Internet width={18*em} height={18*em} />)
    }else if (type == Q_TYPES.A){
      return (<Astuce width={18*em} height={18*em} />)
    }
}

export default RechercheItem = ({id, type, title, solution, date, questions}) => {
    return (<TouchableOpacity onPress={() => Actions.recherchefoundresult({isFromHistory:true, title:title, dateString:date, qType:type, solution, questions})}>
        <View style={styles.mainWrapper}>
            <View style={[styles.circleBg, {backgroundColor:colors[type][3]}]}>
                {renderIcons(type)}
            </View>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.titleText}>{type}</Text>

            <Text style={styles.dateText}>{solution}</Text>


            </View>
        </View>
    </TouchableOpacity>)
}

const styles = {
      mainWrapper:{
          flex:1,
        flexDirection:"row", 
        alignItem:"center", 
        paddingRight:24*em, 
        paddingTop:18*em, 
        paddingBottom:18*em
      },

      titleText:{
        marginLeft: 15*em, 
        fontSize: 13*em, 
        flex: 1, 
        color:"#928DA6", 
        fontFamily:"OpenSans-SemiBold",
        textTransform: 'capitalize'
      },

      dateText:{
        fontSize: 21*em, 
        color:"#251B4D", 
        fontFamily:"OpenSans-Regular",
        paddingLeft:15*em, 
        paddingRight:15*em
      },
      
      circleBg:{
        width: 34*em,
        height: 34*em,
        borderRadius: 17*em,
        alignItems: 'center',
        justifyContent: 'center'
      }
}