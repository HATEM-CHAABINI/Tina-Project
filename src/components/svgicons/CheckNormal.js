import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 21 21">
<g id="Group_2008" data-name="Group 2008" transform="translate(1)" style="isolation: isolate">
  <g id="Rectangle_2" data-name="Rectangle 2" transform="translate(-1)" fill="none" stroke="#928da6" stroke-width="1" opacity="0.3">
    <rect width="21" height="21" rx="10.5" stroke="none"/>
    <rect x="0.5" y="0.5" width="20" height="20" rx="10" fill="none"/>
  </g>
</g>
</svg>
`;
export default CheckNormal = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}