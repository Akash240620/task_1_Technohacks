import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HiSwitchHorizontal } from 'react-icons/hi';
import './App.css';

function App() {
  const [info, setInfo] = useState({});
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    Axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then((res) => {
        setInfo(res.data.rates);
      });
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);

  function convert() {
    const rate = info[to];
    setOutput(input * rate);
  }

  function flip() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <div className="App">
      <div className="heading">
        <h1>Currency Converter</h1>
      </div>
      <div className="container">
        <div className="section">
          <h3>Amount</h3>
          <input type="number" placeholder="Enter the amount" onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="row">
          <div className="section">
            <h3>From</h3>
            <select onChange={(e) => setFrom(e.target.value)} value={from}>
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="switch">
            <HiSwitchHorizontal size="30px" onClick={flip} />
          </div>
          <div className="section">
            <h3>To</h3>
            <select onChange={(e) => setTo(e.target.value)} value={to}>
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button className="convert-button" onClick={convert}>Convert</button>
      <div className="result">
        <h2>Converted Amount:</h2>
        <p>{output.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default App;
