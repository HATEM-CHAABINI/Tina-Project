import React from 'react';
import { SvgXml} from 'react-native-svg';

const xml = `<svg id="tickets" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 55.512 56.79">
<path id="Path_5879" data-name="Path 5879" d="M59.9,23.65,64.974,9.7a4.687,4.687,0,0,1,6.014-2.819l14.564,5.309A4.687,4.687,0,0,1,88.371,18.2L83.25,32.153C82.4,34.6,59.9,23.65,59.9,23.65Z" transform="translate(-34.577 -5.196)" fill="#00d6c6"/>
<path id="Path_5880" data-name="Path 5880" d="M47.706,42.9,36.9,72.639l18.98,6.906a4.7,4.7,0,0,0,5.826-2.3L71.1,51.4Z" transform="translate(-22.383 -24.447)" fill="#fff"/>
<path id="Path_5881" data-name="Path 5881" d="M72.376,92.8a6.687,6.687,0,0,1-2.114-.376l-4.322-1.6a1.4,1.4,0,0,1,.94-2.631l4.322,1.6a3.383,3.383,0,0,0,2.537-.094,3.182,3.182,0,0,0,1.691-1.879L83.511,65.64a1.4,1.4,0,1,1,2.631.94L78.061,88.755a5.963,5.963,0,0,1-3.148,3.43A5.322,5.322,0,0,1,72.376,92.8Z" transform="translate(-37.281 -36.005)" fill="#251b4d"/>
<path id="Path_5882" data-name="Path 5882" d="M89.08,30.579a1.669,1.669,0,0,1-.47-.094,1.375,1.375,0,0,1-.846-1.785l4.557-12.591a3.331,3.331,0,0,0-1.973-4.228L75.785,6.618a3.212,3.212,0,0,0-3.524.846,1.4,1.4,0,1,1-2.067-1.879,6.14,6.14,0,0,1,6.577-1.6L91.335,9.3A6.173,6.173,0,0,1,95,17.142L90.443,29.733A1.514,1.514,0,0,1,89.08,30.579Z" transform="translate(-39.844 -3.622)" fill="#251b4d"/>
<g id="Group_2069" data-name="Group 2069" transform="translate(0 5.815)">
  <path id="Path_5883" data-name="Path 5883" d="M38.6,61.283H9V19H38.6a4.712,4.712,0,0,1,4.7,4.7V56.585A4.712,4.712,0,0,1,38.6,61.283Z" transform="translate(-7.591 -17.591)" fill="#fff"/>
  <path id="Path_5884" data-name="Path 5884" d="M38.6,61.283H9V19H38.6a4.712,4.712,0,0,1,4.7,4.7V56.585A4.712,4.712,0,0,1,38.6,61.283Z" transform="translate(-7.591 -17.591)" fill="#fff"/>
  <path id="Path_5885" data-name="Path 5885" d="M37.008,61.1H7.409A1.384,1.384,0,0,1,6,59.693V17.409A1.384,1.384,0,0,1,7.409,16h29.6a6.1,6.1,0,0,1,6.108,6.108V54.995A6.1,6.1,0,0,1,37.008,61.1ZM8.819,58.283H37.008A3.268,3.268,0,0,0,40.3,54.995V22.108a3.268,3.268,0,0,0-3.289-3.289H8.819Z" transform="translate(-6 -16)" fill="#251b4d"/>
  <path id="Path_5886" data-name="Path 5886" d="M43.185,83.819H31.909a1.409,1.409,0,1,1,0-2.819H43.185a1.409,1.409,0,1,1,0,2.819Z" transform="translate(-18.99 -50.462)" fill="#00d6c6"/>
</g>
<g id="Group_2070" data-name="Group 2070" transform="translate(11.51 19.205)">
  <circle id="Ellipse_73" data-name="Ellipse 73" cx="7.047" cy="7.047" r="7.047" fill="#00d6c6"/>
</g>
</svg>
`;
export default Ticket = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}