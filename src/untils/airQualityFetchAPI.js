import { AIR_QUALITY_API_KEY } from "./consts";

export const airQualityFetchAPI = ([lat,lon]) => ( 
    new Promise((resolve, reject) => {

        const apiKey = AIR_QUALITY_API_KEY;
        const endPoint='http://api.openweathermap.org/data/2.5/air_pollution'
        const url = `${endPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        fetch(url)
            .then(response => {
                // check if the call was successful
                (response.ok) 
                    ? response.json().then(data => resolve(data))
                    : response.json().then(data => reject(data));
            });
    })
);