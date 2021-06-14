import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg
xmlns="http://www.w3.org/2000/svg"
width="20"
height="20"
viewBox="0 0 27 27"
>
<g transform="translate(.5 .5)">
  <path
    fill="#1FD4AF"
    d="M15 2a13 13 0 1013 13A13 13 0 0015 2zm7.419 10.019l-9.1 9.1a1.3 1.3 0 01-1.838 0l-3.9-3.9a1.3 1.3 0 111.838-1.838l2.981 2.981 8.181-8.181a1.3 1.3 0 011.838 1.838z"
    transform="translate(-2 -2)"
  ></path>
</g>
</svg>`;
export default CheckPswDone = ({ width, height }) => {
    return (
        <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
    )
}