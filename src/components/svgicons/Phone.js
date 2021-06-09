import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg id="call" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 15 15">
<path id="icons8-phone" d="M15.234,12.71a.838.838,0,0,0-.854,0l-1.334.795a.835.835,0,0,1-.946-.057A21.71,21.71,0,0,1,10.2,11.8,21.711,21.711,0,0,1,8.546,9.9a.835.835,0,0,1-.057-.946l.795-1.334a.841.841,0,0,0,0-.856L7.329,3.418A.844.844,0,0,0,6.4,3.025,2.767,2.767,0,0,0,5.1,3.8c-1.509,1.509-2.311,4.055,3.365,9.73s8.22,4.874,9.73,3.365a2.778,2.778,0,0,0,.779-1.3.84.84,0,0,0-.391-.927Z" transform="translate(-4 -3)" fill="#928da6"/>
</svg>`;
export default Phone = ({ width, height }) => {
  return (
    <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}