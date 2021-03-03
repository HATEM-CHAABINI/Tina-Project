import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 9 15">
<g id="help" transform="translate(0)">
  <path id="Path_5303" data-name="Path 5303" d="M-16.089,30.732a1.558,1.558,0,0,0-1.557,1.557,1.558,1.558,0,0,0,1.557,1.557,1.558,1.558,0,0,0,1.557-1.557A1.558,1.558,0,0,0-16.089,30.732Z" transform="translate(20.439 -18.845)" fill="#765efc"/>
  <path id="Path_5304" data-name="Path 5304" d="M-16.815,13.145a5.162,5.162,0,0,0-.99-.142A4.5,4.5,0,0,0-22.484,16.4a.987.987,0,0,0,.195.786,1.119,1.119,0,0,0,.731.416,1.536,1.536,0,0,0,.177.012,1.115,1.115,0,0,0,1.092-.84,2.316,2.316,0,0,1,2.741-1.636,2.139,2.139,0,0,1,1.809,2.177c-.049.816-.637,1.351-1.358,2.008a5.6,5.6,0,0,0-1.94,2.661.988.988,0,0,0,.144.8,1.108,1.108,0,0,0,.695.457,1.213,1.213,0,0,0,.252.027,1.163,1.163,0,0,0,.579-.152,1.014,1.014,0,0,0,.492-.6,3.788,3.788,0,0,1,1.307-1.67A4.87,4.87,0,0,0-13.5,17.217,4.164,4.164,0,0,0-16.815,13.145Z" transform="translate(22.5 -12.996)" fill="#765efc"/>
</g>
</svg>`;
export default HELP = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}