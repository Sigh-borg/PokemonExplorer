import React from 'react';
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';
import './grid-styles.scss';

const GridContainer = ({ pokemonData, searchTerm }) => {

  GridContainer.propTypes = {
    pokemonData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.shape({
              name: PropTypes.string.isRequired,
            }).isRequired,
          })
        ).isRequired,
        sprites: PropTypes.shape({
          front_default: PropTypes.string.isRequired,
        }).isRequired,
        species: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    searchTerm: PropTypes.string.isRequired,
  };

  const filteredPokemon = pokemonData.filter((pokemon) => {
    const type1 = pokemon.types[0].type.name.toLowerCase();
    const type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name.toLowerCase() : null;

    return (
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type1.includes(searchTerm.toLowerCase()) || 
      (type2 && type2.includes(searchTerm.toLowerCase())) || 
      (pokemon.id >= parseInt(searchTerm))
    );


  });
  return (
    <div className="grid-container">
      {filteredPokemon.map(pokemon => (
        <Link key={pokemon.id} to={`/details/${pokemon.id}`} className="grid-item">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
          <p>{pokemon.id}</p>
        </Link>
      ))}
    </div>
  );
};

export default GridContainer;