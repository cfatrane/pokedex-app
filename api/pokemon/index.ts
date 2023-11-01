import axios from 'axios';
import { PokeAPI } from 'pokeapi-types';

export const getAllPokemon = async (params: object) => {
  console.log('params', params);
  try {
    const { data } = await axios.get<PokeAPI.NamedAPIResourceList>(
      'https://pokeapi.co/api/v2/pokemon',
      {
        params: { ...params },
      },
    );

    return data;
  } catch (error) {
    console.error('error', error);
  }
};

export const getPokemon = async (id: string) => {
  try {
    const { data } = await axios.get<PokeAPI.Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return data;
  } catch (error) {
    console.error('error', error);
  }
};

// Color
export const getAllPokemonColor = async (params: object) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon-color', {
      params: { ...params },
    });

    return response;
  } catch (error) {
    console.error('error', error);
  }
};

export const getPokemonColor = async (id: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-color/${id}`);

    return response;
  } catch (error) {
    console.error('error', error);
  }
};

// Egg Group
export const getAllPokemonEggGroup = async (params: object) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/egg-group', {
      params: { ...params },
    });

    return response;
  } catch (error) {
    console.error('error', error);
  }
};

export const getPokemonEggGroup = async (id: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/egg-group/${id}`);

    return response;
  } catch (error) {
    console.error('error', error);
  }
};

// Evolution
export const getAllPokemonEvolution = async (params: object) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/evolution-chain', {
      params: { ...params },
    });

    return response;
  } catch (error) {
    console.error('error', error);
  }
};

export const getPokemonEvolution = async (id: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`);

    return response;
  } catch (error) {
    console.error('error', error);
  }
};

// Forms
export const getAllPokemonForm = async (params: object) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon-form', {
      params: { ...params },
    });

    return response;
  } catch (error) {
    console.error('error', error);
  }
};

export const getPokemonForms = async (id: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${id}`);

    return response;
  } catch (error) {
    console.error('error', error);
  }
};

// Species
export const getAllPokemonSpecies = async (params: object) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species', {
      params: { ...params },
    });

    return response;
  } catch (error) {
    console.error('error', error);
  }
};

export const getPokemonSpecies = async (id: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

    return response;
  } catch (error) {
    console.error('error', error);
  }
};

// Type
export const getAllPokemonType = async (params: object) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/type', {
      params: { ...params },
    });

    return response;
  } catch (error) {
    console.error('error', error);
  }
};

export const getPokemonType = async (id: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${id}`);

    return response;
  } catch (error) {
    console.error('error', error);
  }
};
