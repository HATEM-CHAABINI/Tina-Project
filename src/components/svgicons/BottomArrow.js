import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg id="arrow" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 53 53">
<path id="Path_5669" data-name="Path 5669" d="M18.2,0A18.188,18.188,0,1,0,36.4,18.188,18.194,18.194,0,0,0,18.2,0Z" transform="translate(44.691 44.692) rotate(-180)" fill="#28c7ed"/>
<path id="Path_5670" data-name="Path 5670" d="M7.771,7.767a26.493,26.493,0,0,1,37.482,0h0A26.5,26.5,0,0,1,26.511,53,26.525,26.525,0,0,1,0,26.5,26.389,26.389,0,0,1,7.771,7.767ZM43.332,9.686h0A23.819,23.819,0,1,0,50.28,26.5,23.732,23.732,0,0,0,43.332,9.686Z" transform="translate(53 53) rotate(180)" fill="#e8e6ee"/>
<path id="Path_5671" data-name="Path 5671" d="M9.281.416l6.926,6.926a1.371,1.371,0,0,1-1.939,1.939L9.7,4.71V18.932a1.385,1.385,0,0,1-2.771,0V4.71L2.355,9.281a1.339,1.339,0,0,1-1.939,0,1.339,1.339,0,0,1,0-1.939L7.342.416A1.339,1.339,0,0,1,9.281.416Z" transform="translate(34.8 37.113) rotate(180)" fill="#fff"/>
</svg>`;

export default BottomArrow = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}