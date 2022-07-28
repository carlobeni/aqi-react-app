import React, { useEffect, useState } from 'react'
import useDataSelectPlace from '../../hooks/useDataSelectPlace'
import { airQualityFetchAPI } from '../../untils/airQualityFetchAPI'
import Card from './Card'
import './Dashboard.css'

const Dashboard = () => {
  const [dataSelectPlace,] = useDataSelectPlace();

  const [compData, setCompData] = useState({});

  //use to get AQI data from API
  useEffect(() => {
    if (dataSelectPlace.position != null) {
      airQualityFetchAPI(dataSelectPlace.position).then((data) => {
        setCompData(data.list[0].components)
      }, (err) => {
        if (!err.canceled) {
          /*En caso de errores al usar la API se veran aqui*/
          console.log(err);
        }
      });
    }
  },[dataSelectPlace]);

  return (
    <div className='dashboard'>
      {
        Object.keys(compData).map(function (key, index){
          //key:co
          //compData[key]:10
          return <Card 
            key={key}
            value={compData[key]} 
            typeOfComponent={key} />
        })
      }
    </div>
  )
}

export default Dashboard
