import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg
xmlns="http://www.w3.org/2000/svg"
width="WD"
height="HT"
viewBox="0 0 27 27"
>
<g transform="translate(.5 .5)">
  <rect
    width="20"
    height="20"
    fill="none"
    stroke="#a0a4b7"
    strokeWidth="1"
    data-name="Rectangle 1728"
    rx="13"
  ></rect>
</g>
</svg>`;
export default CheckPsw = ({ width, height }) => {
    return (
        <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
    )
}