import React from 'react';
import { SvgXml} from 'react-native-svg';

const xml = `<svg id="fleche" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 17 15">
<path id="Path_5255" data-name="Path 5255" d="M16.632,6.625,10.5.375a1.169,1.169,0,0,0-1.716,0,1.225,1.225,0,0,0,0,1.75L12.832,6.25H1.226a1.25,1.25,0,0,0,0,2.5H12.832L8.786,12.875a1.226,1.226,0,1,0,1.716,1.75l6.13-6.25A1.225,1.225,0,0,0,16.632,6.625Z" transform="translate(17 15) rotate(180)" fill="color"/>
</svg>`;
export default LeftArrow = ({width, height, color}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height).replace('color',color)} />
  )
}