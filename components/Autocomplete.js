import React, {useState, useEffect} from 'react'
import {Loader} from '@googlemaps/js-api-loader'

export default function Autocomplete() {

  const [inputValue, setInputValue] = useState('')
  const [predictions, setPredictions] = useState([])

  const fetchPredictions = (query) => {
    
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {input: query, 
        types: ['geocode']
        },
        (predictions, status) => {
          if (status === 'OK') {
            setPredictions(predictions)
          }
          else {
            setPredictions([])
          }
        }
      )
    
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      // do something after the API has loaded
    });
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        console.log('enter')
       fetchPredictions(event.target.value)
        }
        else{
            console.log('inte enter')
        }
       
    }

   
  

  return (
    <div>
      <div>Autocomplete:</div>
      <div>
        <input className='text-slate-900' type='text' value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        <div className='bg-slate-900'>
        <ul>
          {predictions.map((prediction) => (
            <li key={prediction.place_id}>{prediction.description}</li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  )
}
