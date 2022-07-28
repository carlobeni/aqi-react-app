import SuggestionPlace from './SuggestionPlace'
import './SearchResults.css'

const SearchResults = ({listLabel,onSelect}) => {

    const handleSelect = (id) => {
        onSelect(id);   
    }
    return (
        <>
            <div className='results-container'>
                {
                    listLabel.map((place) => (
                        <SuggestionPlace
                            key={listLabel.indexOf(place)}
                            id={listLabel.indexOf(place)}
                            text={place}
                            handleSelect={handleSelect}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default SearchResults
