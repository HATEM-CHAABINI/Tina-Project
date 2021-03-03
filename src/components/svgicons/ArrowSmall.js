import React from 'react';
import { SvgXml} from 'react-native-svg';

const xml = `<svg id="fleche" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 7 13">
<path id="Path_5675" data-name="Path 5675" d="M4.788,56.118a1.138,1.138,0,0,1-.8-.335,1.258,1.258,0,0,1-.043-1.723l3.925-4.32L3.92,45.152a1.258,1.258,0,0,1,.089-1.722,1.133,1.133,0,0,1,1.647.092l4.667,5.427A1.259,1.259,0,0,1,10.3,50.6L5.634,55.738A1.137,1.137,0,0,1,4.788,56.118Z" transform="translate(-3.621 -43.118)" fill="#928da6"/>
</svg>`;
export default ArrowSmall = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}