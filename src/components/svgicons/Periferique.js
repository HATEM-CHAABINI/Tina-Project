import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg id="periferique" xmlns="http://www.w3.org/2000/svg" width="WD" height="HT" viewBox="0 0 13 19">
  <g id="Group_2377" data-name="Group 2377">
    <path id="Path_6435" data-name="Path 6435" d="M688.649,381.616H689V377.5a.213.213,0,0,0-.224-.2h-6.75a.214.214,0,0,0-.225.2v4.116h6.849Zm-2.749-2.7a.4.4,0,0,1,.4-.4h1.2a.4.4,0,0,1,.4.4v.7a.4.4,0,0,1-.4.4h-1.2a.4.4,0,0,1-.4-.4Zm-3,0a.4.4,0,0,1,.4-.4h1.2a.4.4,0,0,1,.4.4v.7a.4.4,0,0,1-.4.4h-1.2a.4.4,0,0,1-.4-.4Z" transform="translate(-678.901 -376.5)" fill="none"/>
    <path id="Path_6436" data-name="Path 6436" d="M689.828,382.416h-8.86a1.27,1.27,0,0,0-1.255,1.275v4.6a3.5,3.5,0,0,0,3.476,3.519l.4.006V393.1h3.619v-1.275l.4-.006a3.5,3.5,0,0,0,3.477-3.512V383.7A1.271,1.271,0,0,0,689.828,382.416Zm-4.428,5.332a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,685.4,387.748Z" transform="translate(-678.901 -376.896)" fill="#fff"/>
    <rect id="Rectangle_205" data-name="Rectangle 205" width="2" height="1.5" rx="0.4" transform="translate(7 2.016)" fill="#00d6c6"/>
    <rect id="Rectangle_206" data-name="Rectangle 206" width="2" height="1.5" rx="0.4" transform="translate(4 2.016)" fill="#00d6c6"/>
    <path id="Path_6437" data-name="Path 6437" d="M691.308,382.108a2.122,2.122,0,0,0-1.471-.609h.063v-4.022a.865.865,0,0,0-.089-.38,1.119,1.119,0,0,0-.93-.578c-.037,0-.068-.019-.106-.019h-6.75c-.013,0-.025.006-.038.007a1.066,1.066,0,0,0-1.048.805.778.778,0,0,0-.039.165V381.5h.063a2.052,2.052,0,0,0-2.062,2.033v4.49a4.241,4.241,0,0,0,3.877,4.2V395.5h5.244v-3.274a4.242,4.242,0,0,0,3.878-4.2V383.54A1.967,1.967,0,0,0,691.308,382.108Zm-9.508-4.631a.212.212,0,0,1,.225-.2h6.75a.211.211,0,0,1,.224.2V381.5h-7.2Zm9.287,10.557a3.46,3.46,0,0,1-3.477,3.432l-.4.006v3.246H683.59v-3.246l-.4-.006a3.46,3.46,0,0,1-3.476-3.439v-4.5a1.255,1.255,0,0,1,1.255-1.246h8.86a1.256,1.256,0,0,1,1.259,1.253Z" transform="translate(-678.901 -376.5)" fill="#251b4d"/>
    <circle id="Ellipse_74" data-name="Ellipse 74" cx="1.5" cy="1.5" r="1.5" transform="translate(5 8.021)" fill="#00d6c6"/>
  </g>
</svg>`;
export default Periferique = ({width, height}) => {
  return(
      <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
  )
}