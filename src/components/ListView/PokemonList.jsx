import React from 'react';
import { Link } from 'react-router-dom';
import './list-styles.scss';

const List = ({ pokemonData, searchTerm }) => {
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
    <div className="list-view">
      {filteredPokemon.map((pokemon) => (
        <div key={pokemon.id} className="list-item">
          <Link to={`/details/${pokemon.id}`} className="list-item-link">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="list-item-image" />
            <div className="list-item-details">
              <h2>{pokemon.name}</h2>
              <p>Pokédex No. {pokemon.id}</p>
              <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default List;