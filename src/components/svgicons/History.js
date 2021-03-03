import React from 'react';
import { SvgXml} from 'react-native-svg';

const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 9 13">
<g id="historique" transform="translate(0)">
  <path id="Path_5309" data-name="Path 5309" d="M-56.565,53.5h-3.28a2.461,2.461,0,0,0-.817-.8V45.577a1.227,1.227,0,0,0-1.25-1.25,1.229,1.229,0,0,0-1.25,1.25v7.131a2.472,2.472,0,0,0-1.25,2.118,2.5,2.5,0,0,0,2.5,2.5,2.456,2.456,0,0,0,2.067-1.178h3.28a1.224,1.224,0,0,0,1.153-1.323A1.224,1.224,0,0,0-56.565,53.5Z" transform="translate(64.412 -44.327)" fill="#2ac8ef"/>
</g>
</svg>`;
export default History = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}