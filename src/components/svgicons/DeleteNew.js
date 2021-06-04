import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg
xmlns="http://www.w3.org/2000/svg"
width="20"
height="20"
viewBox="0 0 20 20"
>
<path
  fill="#928da6"
  d="M13 3a10 10 0 1010 10A10 10 0 0013 3zm1.178 10l2.744 2.744a.833.833 0 01-1.178 1.178L13 14.178l-2.744 2.744a.833.833 0 11-1.178-1.178L11.822 13l-2.744-2.744a.833.833 0 011.178-1.178L13 11.822l2.744-2.744a.833.833 0 111.178 1.178z"
  transform="translate(-3 -3)"
></path>
</svg>`;

export default AnswerNotFound = ({ width, height }) => {
    return (
        <SvgXml xml={xml.replace('WD', width).replace('HT', height)} />
    )
}