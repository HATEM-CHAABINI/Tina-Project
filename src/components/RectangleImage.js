import React from 'react'
import br1 from '../Assets/rectangle_blue_1.png';
import br2 from '../Assets/rectangle_blue_2.png';
import br3 from '../Assets/rectangle_blue_3.png';
import tr1 from '../Assets/rectangle_trans_1.png';
import tr2 from '../Assets/rectangle_trans_2.png';
import tr3 from '../Assets/rectangle_trans_3.png';
import {Image} from 'react-native';

export default class RectangleImage extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const {color, image, size, mLeft, mRight, mTop, mBottom} = this.props
    var sourceAsset;
    switch(image){
      case "B1":
        sourceAsset = br1;
        break;
      case "B2":
        sourceAsset = br2;
        break;
      case "B3":
        sourceAsset = br3;
        break;
      case "T1":
        sourceAsset = tr1;
        break;
      case "T2":
        sourceAsset = tr2;
        break;
      case "T3":
        sourceAsset = tr3;
        break;
    }

    return(
      <Image source={sourceAsset} style={{width: size, height: size, marginLeft: mLeft, marginRight: mRight, marginTop: mTop, marginBottom: mBottom}} />
      )    
  }
}
