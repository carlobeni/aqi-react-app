import React from 'react'
import { useEffect, useState } from 'react'
import { CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircleProgress.css'
import useDataSelectPlace from '../../hooks/useDataSelectPlace'
import { airQualityFetchAPI } from '../../untils/airQualityFetchAPI'

const config = (percentage) => ({

    // Customize the root svg element
    root: {
        width: '50%', 
        margin:'0',
    },
    // Customize the path, i.e. the "completed progress"
    path: {
        // Path color
        stroke: `rgba(255, 200, 250, ${percentage / 100})`,
        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: 'round',
        // Customize transition animation
        transition: 'stroke-dashoffset 0.5s ease 0s',
        // Rotate the path
        transformOrigin: 'center center',
    },
    // Customize the circle behind the path, i.e. the "total progress"
    trail: {
        // Trail color
        stroke: 'rgba(255,0,255,0.1)',
        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: 'round',
        // Rotate the trail
        transformOrigin: 'center center',
    },
    // Customize the text
    text: {
        // Text color
        fill: 'white',
        // Text size
        fontSize: '16px',
    },
    // Customize background - only used when the `background` prop is true
    background: {

        fill: '#3e98c7',
    },
});
const CircleProgress = () => {

    const [AQI, setAQI] = useState(0);

    const [dataSelectPlace,] = useDataSelectPlace();

    const getQualityLabel=(AQI)=>{
        let labelArray=['Bueno', 'Regular','Moderado','Pobre','Muy Pobre']
        return labelArray[AQI-1];
    }

    //use to get AQI value from API
    useEffect(() => {
        if (dataSelectPlace.position != null) {
            airQualityFetchAPI(dataSelectPlace.position).then((data) => {
                setAQI(data.list[0].main.aqi);
            }, (err) => {
                if (!err.canceled) {
                    /*En caso de errores al usar la API se veran aqui*/
                    console.log(err);
                }
            });
        }
    })

    return (
        <div className='circle-progress'>
            <CircularProgressbar className='circle-widget'
                styles={config((AQI / 5) * 100)}
                value={(AQI / 5) * 100}
                text={`AQI: ${AQI}`}
            >
            </CircularProgressbar>
            <label className='quality-circle-label'>{getQualityLabel(AQI)}</label>
            <label className='location-circle-label'>
                {dataSelectPlace.namePlace}
            </label>
        </div>
    )
}

export default CircleProgress
