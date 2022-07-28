import React from 'react'
import { AQI_CAPTIOS } from '../../untils/consts';
import './Card.css'

const Card = ({ typeOfComponent, value }) => {

    return (
        <div className="card">
            <h4>
                {value.toFixed(2)}<br/>
                {AQI_CAPTIOS['unit'].split('').map((letter) =>
                    !isNaN(letter) || letter==='.'
                     ? <sup>{letter}</sup> 
                     : letter
                )
                }
            </h4>
            <label>
                {AQI_CAPTIOS[typeOfComponent][0].split('').map((letter) =>
                    !isNaN(letter) || letter==='.'
                     ? <sub>{letter}</sub> 
                     : letter
                )
                }
            </label>
            <p>
                {AQI_CAPTIOS[typeOfComponent][1]} 
            </p>
        </div>
    )
}

export default Card
