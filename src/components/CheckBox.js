import React from 'react'
import {em} from '../common/constants';
import CheckNormal from './svgicons/CheckNormal';
import CheckSelected from './svgicons/CheckSelected';

export default CheckBox = ({checked}) => (
    checked? <CheckSelected width={18*em} height={18*em} />:<CheckNormal width={18*em} height={18*em} />
)