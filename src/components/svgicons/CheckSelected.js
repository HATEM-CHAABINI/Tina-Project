import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="HT" height="WD" viewBox="0 0 21 21">
<g id="Group_2008" data-name="Group 2008" transform="translate(1)" style="isolation: isolate">
  <g id="Rectangle_2" data-name="Rectangle 2" transform="translate(-1)" fill="none" stroke="#28c7ed" stroke-width="1">
    <rect width="21" height="21" rx="10.5" stroke="none"/>
    <rect x="0.5" y="0.5" width="20" height="20" rx="10" fill="none"/>
  </g>
  <rect id="Rectangle_178" data-name="Rectangle 178" width="11" height="11" rx="5.5" transform="translate(4 5)" fill="#28c7ed"/>
</g>
</svg>`;
export default CheckSelected = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}