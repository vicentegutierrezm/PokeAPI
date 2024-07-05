// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Función para importar todas las imágenes de la carpeta pokemon_images
function importAll(r) {
  let images = {};
  r.keys().forEach(key => {
    images[key.replace('./', '')] = r(key);
  });
  return images;
}

// Importa todas las imágenes de la carpeta media/pokemon_images
const images = importAll(require.context('/app/src/pokemon_images', false, /\.(png)$/));

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pokemons/');
        setPokemons(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  console.log(images);

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <ul>
        {pokemons.map(pokemon => (
          <li key={pokemon.pokedex_number}>
            <h2>{pokemon.name}</h2>
            <p>Primary Type: {pokemon.primary_type}</p>
            <p>Secondary Type: {pokemon.secondary_type}</p>
            {/* Construye dinámicamente la ruta de la imagen */}
            <img src={images[`${pokemon.name}.png`]} alt={pokemon.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
