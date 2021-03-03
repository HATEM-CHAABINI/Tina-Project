import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 20 20">
<g id="Group_1493" data-name="Group 1493" style="isolation: isolate">
  <g id="Rectangle_2" data-name="Rectangle 2" fill="none" stroke="#928da6" stroke-width="1">
    <rect width="20" height="20" rx="7" stroke="none"/>
    <rect x="0.5" y="0.5" width="19" height="19" rx="6.5" fill="none"/>
  </g>
</g>
</svg>

`;
export default TermsNormal = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}