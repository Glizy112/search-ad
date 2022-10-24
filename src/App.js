import React, { useState, useEffect } from 'react';
import './App.css';
import AdCard from './components/AdCard';
import Searchbar from './components/Searchbar';

function App() {

  const [adsData, setAdsData] = useState([]);
  const [inputText, setInputText] = useState('');

  //Fetching all ads on initial render
  useEffect(()=> {
    const getAllAds =async()=> {
      const response = await fetch('http://localhost:5000/allAds');
      const data = await response.json();
      if(data) {
        setAdsData(data);
      } 
      console.log("All ads listed--> ", data);
    }
    return()=> getAllAds();
  },[]);

  //Fetching all ads on the input state-> i.e either it's empty or not
  useEffect(()=> {
    const getAllAds =async()=> {
      const response = await fetch('http://localhost:5000/allAds');
      const data = await response.json();
      if(data) {
        setAdsData(data);
      } 
      console.log("All ads listed--> ", data);
    }
    return()=> getAllAds();
  },[inputText]);

  //Fetching the ads matched with search query
  const handleSubmit =async(searchKey)=> {
    const response = await fetch(`http://localhost:5000/findAd/${searchKey}`);
    const data = await response.json();
    if(data) {
      console.log("Searched Ad-->", data);
      setAdsData(data);
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <div>
          <h1> Hello World </h1>
          <Searchbar 
            handleInpChange={(inpTxt)=> setInputText(inpTxt)} 
            handleSearch={(searchKey)=> handleSubmit(searchKey)}
          />
          <div className='row'>
            {
              adsData?.map((item)=> (
                <div key={item._id} className='col-md-6 mt-4'>
                  <AdCard adItem={item}/>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
