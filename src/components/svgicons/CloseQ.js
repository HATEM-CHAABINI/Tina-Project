import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 15">
<path id="Path_5307" data-name="Path 5307" d="M-30.013-5.874-25.49-10.4a1.747,1.747,0,0,0,0-2.468,1.747,1.747,0,0,0-2.468,0L-32.48-8.34-37-12.864a1.747,1.747,0,0,0-2.468,0,1.747,1.747,0,0,0,0,2.468l4.524,4.522-4.522,4.522a1.743,1.743,0,0,0,0,2.466,1.743,1.743,0,0,0,2.466,0l4.522-4.522,4.522,4.522a1.743,1.743,0,0,0,2.466,0,1.743,1.743,0,0,0,0-2.466Z" transform="translate(39.98 13.374)" fill="#251B4D"/>
</svg>`;
export default class CloseQ extends React.Component {
    render() {
        return (
            <SvgXml xml={xml} />
        );
    }
}