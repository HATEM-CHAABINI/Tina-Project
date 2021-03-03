import React from 'react';
import { SvgXml} from 'react-native-svg';

const xml = `<svg id="position" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 10 15">
<path id="icons8-marker" d="M14,1A5.007,5.007,0,0,0,9,6c0,4.41,4.572,9.67,4.766,9.893A.31.31,0,0,0,14,16a.322.322,0,0,0,.234-.107C14.428,15.667,19,10.316,19,6A5.007,5.007,0,0,0,14,1Zm0,3.437a1.875,1.875,0,1,1-1.875,1.875A1.875,1.875,0,0,1,14,4.437Z" transform="translate(-9 -1)" fill="#928da6"/>
</svg>`;
export default Position = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}