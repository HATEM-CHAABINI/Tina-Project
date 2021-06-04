import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg
xmlns="http://www.w3.org/2000/svg"
width="WD"
height="HT"
viewBox="0 0 12 12"
>
<path
  fill="#a0aeb8"
  d="M11.532 9.268A1.605 1.605 0 0110.394 12a1.511 1.511 0 01-1.119-.478L6.009 8.279l-3.266 3.243A1.6 1.6 0 011.606 12a1.632 1.632 0 01-1.138-.478 1.612 1.612 0 010-2.271l3.266-3.246L.468 2.74A1.607 1.607 0 012.743.469L6.009 3.73 9.257.469a1.607 1.607 0 012.275 2.271L8.266 6.005z"
  data-name="Close Square"
></path>
</svg>`;
export default CloseR = ({ width, height }) => {
    return (
        <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
    )
}