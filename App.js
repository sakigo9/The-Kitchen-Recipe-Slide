import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App=() =>{

   const APP_ID='8b225f39';
   const APP_KEY = '9627ca067cc1b02a2dc1a0c175c64e10';
  

const [recipe,setRecipes]=useState([]);
const [search,setSearch]=useState("");
const [query,setQuery]=useState('chicken');

useEffect(()=>{
  getRecipes();
},[query])


const getRecipes= async()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data =await  response.json();
    setRecipes(data.hits);
    console.log(data.hits);
}

const updateSearch=e =>{
   setSearch(e.target.value);
   console.log(search);
}

// Handling the search when button is clicked
const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
}



  return (
    <div className="App">
      <form  onSubmit={getSearch }className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button   className="search-button" type="submit">
          SEARCH
          </button>
      </form>
      <div className="recipes">
      {recipe.map(recipe=>(
<Recipe 
key={recipe.recipe.label}
title={recipe.recipe.label} 
calories={recipe.recipe.calories} 
image={recipe.recipe.image}
ingredients={recipe.recipe.ingredients}
/>
      ))}
      </div>
    </div>
  );
}

export default App;
