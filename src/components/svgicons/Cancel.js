import React from 'react';
import { SvgXml} from 'react-native-svg';

const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 20 20">
<path id="icons8-cancel" d="M13,3A10,10,0,1,0,23,13,10,10,0,0,0,13,3Zm1.178,10,2.744,2.744a.833.833,0,0,1-1.178,1.178L13,14.178l-2.744,2.744a.833.833,0,1,1-1.178-1.178L11.822,13,9.078,10.256a.833.833,0,0,1,1.178-1.178L13,11.822l2.744-2.744a.833.833,0,1,1,1.178,1.178Z" transform="translate(-3 -3)" fill="#928da6"/>
</svg>`;
export default Email = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}