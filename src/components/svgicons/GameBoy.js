import React from 'react';
import { SvgXml} from 'react-native-svg';

const xml = `<svg id="game_boy" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 46.139 59.643">
<path id="Path_5888" data-name="Path 5888" d="M62.323,70.267H30.813A2.786,2.786,0,0,1,28,67.453V16.813A2.786,2.786,0,0,1,30.813,14H67.949a2.786,2.786,0,0,1,2.813,2.813V61.827Z" transform="translate(-26.312 -12.312)" fill="#fff"/>
<path id="Path_5889" data-name="Path 5889" d="M61.011,70.643H29.5a4.515,4.515,0,0,1-4.5-4.5V15.5A4.515,4.515,0,0,1,29.5,11H66.637a4.515,4.515,0,0,1,4.5,4.5V60.515a1.532,1.532,0,0,1-.506,1.182l-8.44,8.44A1.532,1.532,0,0,1,61.011,70.643ZM29.5,14.376A1.129,1.129,0,0,0,28.376,15.5v50.64A1.129,1.129,0,0,0,29.5,67.267H60.335l7.427-7.427V15.5a1.129,1.129,0,0,0-1.125-1.125Z" transform="translate(-25 -11)" fill="#251b4d"/>
<path id="Path_5890" data-name="Path 5890" d="M39,25H69.384V54.821H39Z" transform="translate(-31.123 -17.123)" fill="#ffc756"/>
<path id="Path_5891" data-name="Path 5891" d="M67.7,85.9a1.688,1.688,0,1,0,1.688,1.688A1.688,1.688,0,0,0,67.7,85.9Zm-6.752,6.246a1.688,1.688,0,1,0,1.688,1.688A1.688,1.688,0,0,0,60.944,92.146Zm-11.816-2.87H45.752V85.9H42.376v3.376H39v2.87h3.376v3.376h3.376V92.146h3.376Z" transform="translate(-31.123 -43.756)" fill="#ff5576"/>
</svg>
`;
export default GameBoy = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}