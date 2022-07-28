import './SuggestionPlace.css'
import {BiMap} from 'react-icons/bi'

const SuggestionPlace = ({id,handleSelect,text}) => {

  return (

    <div className={'suggestion-container'} onClick={()=>handleSelect(id)}>
      <BiMap
        className='close-icon'
      />
      <div className='text-container'>
        <p className='text'>{text}</p>
      </div>
    </div>
  )
}

export default SuggestionPlace
