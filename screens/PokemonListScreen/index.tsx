import { useEffect, useState } from 'react';

import { Layout } from '@ui-kitten/components';
import { PokeAPI } from 'pokeapi-types';
import { FlatList, StyleSheet } from 'react-native';

import { getAllPokemon } from 'api/pokemon';

import PokemonCard from 'components/PokemonCard';

const LIMIT = 10;

const PokemonListScreen = () => {
  const [pokemonList, setPokemonList] = useState<PokeAPI.NamedAPIResource[]>([]);
  const [offset, setOffset] = useState(0);

  const fetchAllPokemon = async () => {
    try {
      const data = await getAllPokemon({ offset, limit: LIMIT });

      if (data && data.results.length > 0) {
        setPokemonList([...pokemonList, ...data.results]);
        setOffset(offset + LIMIT);
      }
    } catch (error) {
      setPokemonList([]);
      console.error('error', error);
    }
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  return (
    <Layout level="4" style={styles.container}>
      {pokemonList.length > 0 && (
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-around',
          }}
          data={pokemonList}
          numColumns={2}
          onEndReached={() => fetchAllPokemon()}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
        />
      )}
    </Layout>
  );
};

export default PokemonListScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
