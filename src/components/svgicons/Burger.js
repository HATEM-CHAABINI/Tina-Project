import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg id="burger" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 19 15">
  <rect id="Rectangle_124" data-name="Rectangle 124" width="16" height="3" rx="1.5" transform="translate(3)" fill="#251b4d"/>
  <rect id="Rectangle_125" data-name="Rectangle 125" width="19" height="3" rx="1.5" transform="translate(0 6)" fill="#251b4d"/>
  <rect id="Rectangle_126" data-name="Rectangle 126" width="16" height="3" rx="1.5" transform="translate(3 12)" fill="#251b4d"/>
  </svg>`;
export default Burger = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}