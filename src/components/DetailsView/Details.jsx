import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './styles.scss';

const Details = () => {
  const { id } = useParams();

  const [pokemonDetails, setPokemonDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const handlePrevClick = () => {
    if (id > 1) {
      navigate(`/details/${parseInt(id) - 1}`);
    }
  };

  const handleNextClick = () => {
    if (id < 1017) {
      navigate(`/details/${parseInt(id) + 1}`);
    }
  };

  if (!pokemonDetails) {
    return <p>Loading...</p>;
  }

  const exitPath = location.state?.from || '/';

  return (
    <div className="pokemon-detail">
      <div className="container">
        <div className="sprite-container">
          <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} className="sprite" />
        </div>
        <div className="details-container">
          <h2>{pokemonDetails.name}</h2>
          <p>No. {id}</p>
          <p>Height: {pokemonDetails.height / 10} meters</p>
          <p>Weight: {pokemonDetails.weight / 10} kilograms</p>
          <p>Type: {pokemonDetails.types.map(type => type.type.name).join(', ')}</p>
        </div>
      </div>
      <div className="button-container">
        <button className="button button-prev" onClick={handlePrevClick} disabled={id <= 1}>
          &#8656; Prev
        </button>
        <button className="button button-next" onClick={handleNextClick} disabled={id >= 1017}>
          Next &#8658;
        </button>
      </div>
      <div className="button-container">
        <button className="button button-exit" onClick={() => navigate(exitPath)}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default Details;
