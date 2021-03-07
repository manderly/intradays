import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getTradingData } from '../../../services/api';
import { processTradingHistory } from '../../../services/utils';

interface IForm {
  
}

const Form: React.FC<IForm> = ({}) => {

  const [ stockSymbol, setStockSymbol ] = useState('gme');
  const [ data, setData ] = useState([] as any);

  const inputStockSymbol = (event: any) => {
    setStockSymbol(event.target.value);
    console.log("User's form input so far: " + event.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Submitted form with this input: " + stockSymbol);
    let rawData = await getTradingData(stockSymbol);
    console.log(rawData);
    let processedData = processTradingHistory(rawData);
    setData(processedData);
    console.log(processedData);
  }

  return (
    <div>
      <form noValidate onSubmit={ handleSubmit }>
        <SearchBar symbol={stockSymbol} handleChange={inputStockSymbol} />
        {
          data.map((d: any) => (
            <p>
              {d.timestamp}
            </p>
          ))
        }
      </form>
    </div>
  )
}

export default Form;