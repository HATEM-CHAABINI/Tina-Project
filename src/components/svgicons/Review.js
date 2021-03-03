import React from 'react';
import { SvgXml} from 'react-native-svg';

const xml = `<svg id="review" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 32.31 30">
<path id="icons8-star" d="M18.212,27.268,26.286,32a1.672,1.672,0,0,0,2.507-1.77L26.65,21.307,33.785,15.3a1.624,1.624,0,0,0-.959-2.863l-9.391-.774L19.761,3.239a1.7,1.7,0,0,0-3.1,0L12.99,11.663,3.6,12.437A1.624,1.624,0,0,0,2.64,15.3l7.135,6.007L7.632,30.233A1.672,1.672,0,0,0,10.139,32Z" transform="translate(-2.057 -2.243)" fill="COLOR"/>
</svg>
`;
export default Review = ({width, height, color}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height).replace('COLOR', color)} />
  )
}