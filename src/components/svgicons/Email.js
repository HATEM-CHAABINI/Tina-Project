import React from 'react';
import { SvgXml} from 'react-native-svg';

const xml = `<svg id="email" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 15 10">
<path id="icons8-new_post" d="M1.823,6l6.039,5.845a.911.911,0,0,0,1.274,0L15.177,6ZM1,6.723V16H16V6.723L9.869,12.657a1.958,1.958,0,0,1-2.737,0Z" transform="translate(-1 -6)" fill="#928da6"/>
</svg>`;
export default Email = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}