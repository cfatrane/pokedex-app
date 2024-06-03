import { useEffect, useState, useCallback, useRef } from "react";

import { PokeAPI } from "pokeapi-types";
import { FlatList, StyleSheet, View } from "react-native";

import PokemonCard from "@/components/PokemonCard";

import { getAllPokemon } from "@/api/pokemon";

const LIMIT = 10;

const PokemonListScreen = () => {
  const [pokemonList, setPokemonList] = useState<PokeAPI.NamedAPIResource[]>(
    [],
  );
  const offsetRef = useRef(0);
  const [loading, setLoading] = useState(false);

  const fetchAllPokemon = useCallback(async () => {
    if (loading) return; // Prevent multiple simultaneous fetches
    setLoading(true);

    try {
      const data = await getAllPokemon({
        limit: LIMIT,
        offset: offsetRef.current,
      });

      if (data && data.results.length > 0) {
        setPokemonList((prevList) => [...prevList, ...data.results]);
        offsetRef.current += LIMIT;
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

  const handleEndReached = useCallback(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

  return (
    <View style={styles.container}>
      {pokemonList.length > 0 && (
        <FlatList
          columnWrapperStyle={{
            justifyContent: "space-around",
          }}
          data={pokemonList}
          numColumns={2}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5} // Adjust to control when the fetching is triggered
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
        />
      )}
    </View>
  );
};

export default PokemonListScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
