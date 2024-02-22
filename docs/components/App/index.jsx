import React, { useState, useEffect } from 'react';
import { Route, Routes} from "react-router-dom";

import axios from 'axios';
import Header from '../Header';
import Search from '../Search';
import Details from '../DetailsView/Details';
import GridContainer from '../GridView/GridContainer';
import List from '../ListView/PokemonList';
import PropTypes from 'prop-types';

function App(props) {

  App.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSortBy: PropTypes.func.isRequired,
    setTypeFilter: PropTypes.func.isRequired,
  };

  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const FetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1017');
        const results = response.data.results;

        // Fetch detailed data for each Pokemon
        const pokemonDetails = await Promise.all(results.map(async (pokemon) => {
          const detailedResponse = await axios.get(pokemon.url);
          return detailedResponse.data;
        }));

        setPokemonData(pokemonDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        setLoading(false);
      }
    };

    FetchPokemonData();
  }, []); 
  
  const filteredData = pokemonData
    .filter((pokemon) => {
      const searchLower = searchTerm.toLowerCase();
      if (isNaN(searchLower)) {
          // If the search term is not a number, search by name
          return pokemon.name.toLowerCase().includes(searchLower);
      } else {
          // If the search term is a number, search by ID
          return pokemon.id.toString().includes(searchLower);
      }
    })
    .filter((pokemon) => !typeFilter || pokemon.types.some((type) => type.type.name === typeFilter))
    .sort((a, b) => {
      if (sortBy === 'numerical') {
        return a.id - b.id;
      } else if (sortBy === 'reverseNumerical') {
        return b.id - a.id;
      } else if (sortBy === 'alphabetical') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'reverseAlphabetical') {
        return b.name.localeCompare(a.name);
      } else {
        return 0; // No sorting
      }
    });


  return (
    <div className="App">
      <Header />
      <Search searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSortChange={setSortBy}
        onTypeFilter={setTypeFilter}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Routes>
          <Route path="/" element={<GridContainer pokemonData={filteredData} searchTerm={searchTerm} />} />
          <Route path="/list" element={<List pokemonData={filteredData} searchTerm={searchTerm}/>} />
          <Route path="/details/:id" element={<Details pokemon={pokemonData}/>} />
        </Routes>
      )}
    </div>
  );


}


//const Main = () => <Routes><Route path="/" element={<App />} /></Routes>;

export default App;

