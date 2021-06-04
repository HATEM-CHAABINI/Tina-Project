import React from 'react'
import { View, TouchableOpacity,Text } from 'react-native'
import Review from './svgicons/Review';
import {em} from '../common/constants'

export default class RatingStars extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      rating: props.rating
    }
  }

  handleStarClick = (i) => {
    this.setState({rating: i})
  }

   renderStar = (rating) => {
    if (rating == 4){
      return (<Text style={styles.relevantText}>Très Pertinente</Text> )
    }else if (rating == 3){
      return (<Text style={styles.relevantText}>Pertinente</Text>)
    }else if (rating == 2){
      return (<Text style={styles.relevantText}>Peu Pertinente</Text>)
    }else if (rating == 1){
      return (<Text style={styles.relevantText}>Non Pertinente</Text>)
    }
  }

  render(){
    var starContents = [];
    for (var i = 1; i <= 4; i++){
     starContents.push(<TouchableOpacity key={i} style={styles.ratingStar} onPress={this.handleStarClick.bind(this, i)}><Review width={30*em} height={30*em} color={i <= this.state.rating? "#f7d100":"#ebeaf0"} /></TouchableOpacity>) 
    }

    return(
      <View style={styles.modalWrapper}>
      <View style={styles.ratingWrapper}>
          {starContents}
          
      </View>
      {this.renderStar(this.state.rating)}
      </View>
    )
  }
}
const styles = {
  ratingWrapper: {
    flexDirection:"row", 
    justifyContent:"center", 
    marginTop: 10*em, 
    marginBottom: 20*em
  },

  relevantText: {
    color:"#f7d100", 
    textAlign: "center", 
    fontSize: 13*em,
    fontFamily: "OpenSans-Bold"
  }, 
  
  modalWrapper:{
    
    flexDirection: "column", 
    justifyContent:'center', 
    alignItems: 'center',
  },

  ratingStar:{
    marginRight: 7.5*em,
    marginLeft: 7.5*em
  }
}