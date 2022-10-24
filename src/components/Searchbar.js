import React, { useState } from 'react'

const Searchbar = ({ handleSearch, handleInpChange }) => {

  const [text, setText] = useState('');

  const handleChange =(e)=> {
    e.preventDefault();
    setText(e.target.value);
  }

  return (
    <div className='search_container'>
        <input 
            type="text" 
            name="searchInput" 
            placeholder="Enter search keyword" 
            className='border border-1 border-primary py-2 px-3' 
            onChange={(e)=> {handleChange(e); handleInpChange(e.target.value)}} 
            onSubmit={(text)=> handleSearch(text)}
        />
        <input 
            value="Search" 
            type="submit" 
            className='bg-primary text-white border-0 mx-2 py-2 px-3'
            onClick={()=> handleSearch(text)}
        />
    </div>
  )
}

export default Searchbar