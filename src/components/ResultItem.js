import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import Dash from 'react-native-dash';
import { em, hm } from '../common/constants';

export default ResultItem = ({id, title, answer}) => {
    var itemStyle = styles.ResultItem;
    // If first item, give it top margin because of shadow
    if (id == 1) itemStyle = StyleSheet.flatten([styles.ResultItem, {marginTop:15*em}]);
    
    return(
        <View style={itemStyle}>
            <View style={styles.TitleContainer}>
                <View style={styles.numberCircle}>
                <Text style={styles.numberCircles}>{id}</Text>
                </View>
                <Text style={styles.titleText}>{title}</Text>
            </View>

            <View style={styles.AnswerContainer}>
                <Dash style={styles.verticalDash} dashColor={"#fff"} dashThickness={1*em} dashGap={6*em} dashLength={8*em}/>
                <Text style={styles.answerText}>{answer}</Text>
            </View>
        </View>
    )
}

const styles = {
    ResultItem: {
        flexDirection: "column", 
        paddingLeft: 25*em, 
        paddingRight: 25*em
      },
    TitleContainer:{
        flexDirection:"row", 
        alignItems:"center", 
        zIndex:-1
    },
    AnswerContainer:{
        flexDirection:"row", 
        alignItems:"center"
    },

    numberCircle:{
        backgroundColor:"#fff", 
        // elevation:20, 
        width:20*em, 
        height:20*hm, 
        borderRadius:10*em, 
      
        
        // paddingTop:3*hm
    },
    numberCircles:{
      
        // elevation:20, 
        width:20*em, 
        height:20*hm, 
        
        color:"#251b4d", 
        fontSize: 11*em, 
        fontFamily:"OpenSans-Bold", 
        textAlign:"center", 
        paddingTop:3*hm
    },

    titleText:{
        paddingLeft: 14*em, 
        color:"#251b4d", 
        fontSize: 14*em, 
        fontFamily:"OpenSans-SemiBold"
    },

    verticalDash:{
        flexDirection:"column", 
        height:50*em, 
        paddingLeft:10*em       
    },

    answerText:{
        color:"#a099b0", 
        paddingLeft: 30*em, 
        fontFamily: "OpenSans-Regular", 
        fontSize: 14*em       
    }
}