import React from 'react';
import { SvgXml} from 'react-native-svg';

const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 40.805 25">
<g id="Group_2391" data-name="Group 2391" transform="translate(-67.605 -305.871)">
  <g id="Rectangle_153" data-name="Rectangle 153" transform="translate(70.967 307.68)" fill="#ebeaf1" stroke="#ebeaf1" stroke-width="1">
    <rect width="37.442" height="21.381" rx="10.69" stroke="none"/>
    <rect x="0.5" y="0.5" width="36.442" height="20.381" rx="10.19" fill="none"/>
  </g>
  <path id="Path_5289" data-name="Path 5289" d="M52.681,24A12.5,12.5,0,1,0,65.362,36.5,12.592,12.592,0,0,0,52.681,24Z" transform="translate(27.605 281.871)" fill="#ebeaf1"/>
  <path id="Path_5290" data-name="Path 5290" d="M56.779,32a8.6,8.6,0,1,0,8.779,8.6A8.69,8.69,0,0,0,56.779,32Z" transform="translate(23.507 277.773)" fill="#fff"/>
</g>
</svg>`;
export default SwitchOff = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}