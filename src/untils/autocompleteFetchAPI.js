import { AUTOCOMPLETE_API_KEY } from './consts'

export const autocompleteFetchAPI = (inputValue) => ( 
        new Promise((resolve, reject) => {

            const apiKey = AUTOCOMPLETE_API_KEY;
            const endPoint='https://api.geoapify.com/v1/geocode/autocomplete'
            const url = `${endPoint}?text=${encodeURIComponent(inputValue)}&limit=5&apiKey=${apiKey}`;

            fetch(url)
                .then(response => {
                    // check if the call was successful
                    (response.ok) 
                        ? response.json().then(data => resolve(data))
                        : response.json().then(data => reject(data));
                });
        })
);