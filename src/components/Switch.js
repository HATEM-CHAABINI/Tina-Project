import React from 'react'
import SwitchOn from './svgicons/SwitchOn';
import SwitchOff from './svgicons/SwitchOff';
import {em} from '../common/constants'

export default Switch = ({checked}) => (
    checked? <SwitchOn width={40*em} height={24*em} />:<SwitchOff width={40*em} height={24*em} />
)