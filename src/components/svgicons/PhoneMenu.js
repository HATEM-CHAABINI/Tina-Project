import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg
xmlns="http://www.w3.org/2000/svg"
width="12"
height="15"
viewBox="0 0 12 15"
>
<path
  fill="#251b4d"
  d="M11.575 14.4a1.382 1.382 0 00-.548.12l-1.6.827a2.342 2.342 0 00-1.355 2.21 14.408 14.408 0 002.238 6.749 14.9 14.9 0 005.3 4.84 2.3 2.3 0 001.05.255 2.452 2.452 0 001.537-.541l1.34-1.022.076-.06a1.213 1.213 0 00.457-.872 1.147 1.147 0 00-.32-.842l-2.466-2.42a1.157 1.157 0 00-.822-.331 1.387 1.387 0 00-.685.2l-1.065.676a.245.245 0 01-.122.045.122.122 0 01-.122-.06l-2.283-3.517a.188.188 0 01-.015-.09.192.192 0 01.106-.135l1.065-.676a1.188 1.188 0 00.518-1.4l-1.2-3.231a1.128 1.128 0 00-1.084-.725z"
  transform="translate(-8.069 -14.4)"
></path>
</svg>`;
export default PhoneMenu = ({ width, height }) => {
    return (
        <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
    )
}