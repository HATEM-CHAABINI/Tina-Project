import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg id="back" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 15 13">
<path id="Path_5653" data-name="Path 5653" d="M-23.11,8.119l-5.226-5.687a.353.353,0,0,0-.407-.088.407.407,0,0,0-.231.375V5.56c-8.042-.106-8.279-3.63-8.281-3.661a.407.407,0,0,0-.379-.4A.391.391,0,0,0-38,1.909v.009c.007.326.293,9.084,9.027,9.327v2.849a.408.408,0,0,0,.231.375.347.347,0,0,0,.143.031.357.357,0,0,0,.264-.12l5.226-5.688A.432.432,0,0,0-23.11,8.119Z" transform="translate(-23 14.5) rotate(180)" fill="#251b4d"/>
</svg>`;
export default Back = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}