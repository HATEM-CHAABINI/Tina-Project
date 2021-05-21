import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect from "react-native-picker-select";
import { em } from '../common/constants';
class PickerSubject extends Component {
   state = {subject: ''}

   updateSubject = (subject) => {
      this.setState({ subject: subject })
   }

   
   render() {
      return (
        <View style={styles.container}>
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            style={styles.picker}
            items={[
                { label: "JavaScript", value: "JavaScript" },
                { label: "TypeStript", value: "TypeStript" },
                { label: "Python", value: "Python" },
                { label: "Java", value: "Java" },
                { label: "C++", value: "C++" },
                { label: "C", value: "C" },
            ]}
        />
    </View>
      )
   }
}
export default PickerSubject

const styles = StyleSheet.create({
    container: {
        margin:50*em,
        marginTop: 100*em,

    },
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   },
   picker:{
       height:200*em,
       fontSize: 30
   }

})