import React from 'react';
import { SvgXml} from 'react-native-svg';

const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 71.913 70.401">
<g id="binoculars" transform="translate(1.366 1.366)">
  <g id="icons8-binoculars" transform="translate(-22.191 14.641) rotate(-30)">
    <path id="Path_5872" data-name="Path 5872" d="M13.5,102H36.738v6.2H13.5Zm28.918,0H65.656v6.2H42.418Z" transform="translate(0 -39.172)" fill="#fff"/>
    <path id="Path_5873" data-name="Path 5873" d="M65.492,62.828,61.877,38.557H59.3V30.812a2.557,2.557,0,0,0-2.582-2.582H54.648v-6.2A1.036,1.036,0,0,0,53.615,21h-7.23a1.036,1.036,0,0,0-1.033,1.033v6.2H38.639v-6.2A1.036,1.036,0,0,0,37.607,21h-7.23a1.036,1.036,0,0,0-1.033,1.033v6.2H27.279A2.557,2.557,0,0,0,24.7,30.812v7.746H22.115L18.5,62.828h2.582v6.2H39.156v-6.2H36.574V38.557H47.418V62.828H50v6.2H68.074v-6.2Z" transform="translate(-2.418)" fill="#88e3ff"/>
    <path id="Path_5874" data-name="Path 5874" d="M20,57.664C26.352,57.613,31.619,41.914,32.91,21H31.1a1.036,1.036,0,0,0-1.033,1.033v6.2H28a2.557,2.557,0,0,0-2.582,2.582v7.746H22.84Z" transform="translate(-3.143)" fill="#fff"/>
    <path id="Path_5875" data-name="Path 5875" d="M40.755,45.328H36.108V60.3a5.179,5.179,0,0,1-5.164,5.164H29.188a2.01,2.01,0,0,0-2.014,1.756v.052A2.012,2.012,0,0,0,29.188,69.6h8.985v6.2h5.164V69.6H40.755ZM69.674,69.6,66.059,45.328H63.477V37.582A2.557,2.557,0,0,0,60.895,35H57.8a2.557,2.557,0,0,1,2.582,2.582v7.746H51.6V55.6a10.319,10.319,0,0,0,9.3-10.276h.62l2.117,14.2a5.192,5.192,0,0,1-5.112,5.939H57.8a2.066,2.066,0,0,0,0,4.131h9.3v6.2h5.164V69.6Z" transform="translate(-6.6 -6.77)" fill="#146b8e"/>
    <path id="Path_5876" data-name="Path 5876" d="M13.5,62.828H36.738v6.2H13.5ZM34.156,38.557V62.828H16.082L19.7,38.557h6.2m1.033-16.525A1.036,1.036,0,0,1,27.959,21h7.23a1.036,1.036,0,0,1,1.033,1.033v6.2m6.713,0v-6.2A1.036,1.036,0,0,1,43.967,21H51.2a1.036,1.036,0,0,1,1.033,1.033v6.2m-29.951,6.2V30.812a2.557,2.557,0,0,1,2.582-2.582H54.3a2.557,2.557,0,0,1,2.582,2.582v3.615m6.2,28.4H45V38.557H59.459Zm-20.656,0H65.656v6.2H42.418Z" fill="none" stroke="#251b4d" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
    <path id="Path_5877" data-name="Path 5877" d="M59.443,55.328H50.664A5.179,5.179,0,0,1,45.5,50.164h0A5.179,5.179,0,0,1,50.664,45h8.779a5.179,5.179,0,0,1,5.164,5.164h0A5.179,5.179,0,0,1,59.443,55.328Z" transform="translate(-15.475 -11.606)" fill="#88e3ff"/>
    <path id="Path_5878" data-name="Path 5878" d="M59.443,55.328H50.664A5.179,5.179,0,0,1,45.5,50.164h0A5.179,5.179,0,0,1,50.664,45h8.779a5.179,5.179,0,0,1,5.164,5.164h0A5.179,5.179,0,0,1,59.443,55.328Z" transform="translate(-15.475 -11.606)" fill="none" stroke="#251b4d" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
  </g>
</g>
</svg>
`;
export default Binoculars = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}