import React, { useEffect, useState } from 'react'
import './SearchBar.css'
import { autocompleteFetchAPI } from '../../untils/autocompleteFetchAPI';
import { BiCurrentLocation, BiX } from "react-icons/bi"
import SearchResults from './SearchResults';
import { useGeolocated } from "react-geolocated";
import useDataSelectPlace from '../../hooks/useDataSelectPlace';


const SearchBar = () => {

    //to get addresses
    const [inputValue, setInputValue] = useState("");
    //to save suggestion data places
    const [suggestionList, setSuggestionList] = useState([]);
    //to save data place
    const [dataPlaceSelect, setDataPlaceSelect] = useState();
    //to get current location
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
    });

    const [, setDataToShare] = useDataSelectPlace();

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    /*
    0-WRITE IN INPUT
    1-useEffect of inputValue //Save suggestion list
    2-handleSelect //Save the select element from suggestion list (REMEMBER: Here it ARE NOT current value)
    3-useEffect of dataPlaceSelect //Change the inputValue with label of select element (REMEMBER: Here it ARE current value)
    4-useEffect of inputValue  //Don't do anything becaouse isSetInputBySelect() is true
    0-WRITE IN INPUT
    1-useEffect of inputValue //Save suggestion list
    ...
    */

    const handleSelect = (id) => {
        console.log('click-select');
        //Save place select
        setDataPlaceSelect(suggestionList[id]);
        //Clean up suggestionList
        setSuggestionList([])

    }

    const getLabelData = () => suggestionList.map((placeData) => placeData.formatted);
    const isSetInputBySelect = () => dataPlaceSelect === undefined ? false : dataPlaceSelect.formatted === inputValue;

    //get data from API
    useEffect(() => {
        if (!isSetInputBySelect()) {
            if (inputValue.length > 3) {
                autocompleteFetchAPI(inputValue).then((listPlaces) => {
                    let UpdateSuggestionsList = listPlaces.features.map((e) => e.properties)
                    setSuggestionList(UpdateSuggestionsList)
                }, (err) => {
                    if (!err.canceled) {
                        console.log(err);
                    }
                });
            } else {
                setSuggestionList([]);
            }
        }
    }, [inputValue]);

    //change inputValue
    useEffect(() => {
        if (dataPlaceSelect !== undefined) {
            setInputValue(dataPlaceSelect.formatted);
            setDataToShare({
                position: [dataPlaceSelect.lat, dataPlaceSelect.lon],
                namePlace: dataPlaceSelect.formatted,
            })
        }
    }, [dataPlaceSelect]);

    const handleSelectCurrentLocation = () => {
        if (!isGeolocationAvailable) alert("Su navegador no soporta geolocalizacion");
        else {
            let arrayCoords=[coords.latitude,coords.longitude];
            console.log(arrayCoords)
            setDataToShare({
                position: arrayCoords,
                namePlace: 'Mi Ubicación',
            })
        }
    }

    const handleCleanUpInput = () => {
        setInputValue("");
    }

    return (
        <div className='main-container'
            style={
                (suggestionList.length === 0)
                    ? { borderRadius: '50px' }
                    : { borderRadius: '10px 10px 0px 0px' }
            }>
            <div className='column-tools'>
                <input
                    type="text"
                    value={inputValue}
                    className="input-fild"
                    onChange={handleChange}
                    placeholder="Buscar lugar..."
                />
                <button className='button-clean-up'>
                    <BiX
                        className='clean-up-icon'
                        onClick={handleCleanUpInput}
                    />
                </button>
                <button className='button-current-location' onClick={handleSelectCurrentLocation}>
                    <BiCurrentLocation
                        className='current-location-icon'
                    />
                </button>
            </div>
            <SearchResults
                listLabel={getLabelData()}
                onSelect={handleSelect}
            />
        </div>
    );
}

export default SearchBar