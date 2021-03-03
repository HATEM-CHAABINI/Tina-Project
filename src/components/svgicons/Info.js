import React from 'react';
import { SvgXml} from 'react-native-svg';

const xml = `<svg id="info" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 11 11">
<path id="icons8-info" d="M7.5,2A5.5,5.5,0,1,0,13,7.5,5.5,5.5,0,0,0,7.5,2Zm0,2.152a.717.717,0,1,1-.717.717A.717.717,0,0,1,7.5,4.152Zm.957,6.457H6.543V10.13h.478V7.022H6.543V6.543H7.978V10.13h.478Z" transform="translate(-2 -2)" fill="color"/>
</svg>`;

export default Info = ({width, height, color}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height).replace('color', color)} />
  )
}