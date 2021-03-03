import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg id="stop" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 15 15.001">
<path id="Path_5297" data-name="Path 5297" d="M25.317,18.213l-.037-.038A7.448,7.448,0,0,0,20,16h0A7.5,7.5,0,0,0,14.69,28.8,7.548,7.548,0,0,0,20,31h.049a7.5,7.5,0,0,0,5.272-12.787Zm-2.448,9.724a5.276,5.276,0,0,1-7.291-7.3ZM17.137,19.06a5.376,5.376,0,0,1,2.876-.848h.011a5.283,5.283,0,0,1,3.721,1.546h0a5.281,5.281,0,0,1,.7,6.6Z" transform="translate(-12.5 -16)" fill="#fe706f"/>
</svg>`;
export default NonVersion = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}