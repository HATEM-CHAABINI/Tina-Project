import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg id="user" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 13.007 15">
<g id="Group_1724" data-name="Group 1724" transform="translate(62.486 -2.503)">
  <g id="Group_1725" data-name="Group 1725" transform="translate(26.012 8.502)">
    <g id="Group_1725-2" data-name="Group 1725" transform="translate(9.044 -17.323)">
      <path id="Path_5308" data-name="Path 5308" d="M-91.043,21.324a5.011,5.011,0,0,0,5-5.012,5,5,0,0,0-5-4.988,5.011,5.011,0,0,0-5,5.013A5,5,0,0,0-91.043,21.324Zm-2.881-5.012a2.88,2.88,0,0,1,2.881-2.872,2.892,2.892,0,0,1,2.88,2.9,2.878,2.878,0,0,1-2.88,2.871,2.892,2.892,0,0,1-2.88-2.9Z" fill="#29c7ec"/>
      <g id="Path_5308-2" data-name="Path 5308">
        <path id="Path_5308-3" data-name="Path 5308" d="M-96.541,26.324a1,1,0,0,1-.8-.4,1,1,0,0,1,.2-1.4,10.229,10.229,0,0,1,6.1-1.982,10.21,10.21,0,0,1,6.11,1.982,1,1,0,0,1,.2,1.4,1,1,0,0,1-1.4.2,8.2,8.2,0,0,0-4.907-1.581,8.209,8.209,0,0,0-4.9,1.582A1,1,0,0,1-96.541,26.324Z" fill="#29c7ec"/>
      </g>
    </g>
  </g>
</g>
</svg>
`;
export default User = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}