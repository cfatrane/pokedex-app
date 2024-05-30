import { useEffect, useState } from "react";

import { Layout, Text } from "@ui-kitten/components";
import { PokeAPI } from "pokeapi-types";
import { Image, StyleSheet, View } from "react-native";

import { extractPokemonGenera, getPokemonImage } from "@/utils/pokemon";
import { toCapitalize } from "@/utils/strings";

import { getPokemon, getPokemonSpecies } from "@/api/pokemon";
import { PokemonItemScreenProps } from "@/navigation/types";

const PokemonItemScreen = ({ navigation, route }: PokemonItemScreenProps) => {
  // State
  const [pokemon, setPokemon] = useState<PokeAPI.Pokemon | undefined>(
    undefined,
  );
  const [generaName, setGeneraName] = useState("");
  const [color, setColor] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Navigation
  const { id } = route.params;

  const pokemonImageUrl = getPokemonImage(id, "other-home-front_default");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemonData = await getPokemon(id);
        const pokemonSpecies = await getPokemonSpecies(id);

        setPokemon(pokemonData);
        setGeneraName(extractPokemonGenera(pokemonSpecies));
        setColor(pokemonSpecies?.color.name);
        setIsLoading(false);
      } catch (error) {
        setPokemon(undefined);
        console.error("error", error);
      }
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon || isLoading) {
    return null;
  }

  return (
    <Layout style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: pokemonImageUrl,
            }}
            style={{ height: 250, width: 250 }}
          />
        </View>

        <Text category="h1" style={styles.text}>
          {toCapitalize(pokemon.name)}
        </Text>
      </View>

      {/* Main */}
      <View style={styles.main}>
        {/* Info */}
        <View style={styles.pokemonInfoContainer}>
          <View style={styles.pokemonInfo}>
            <Text
              category="h4"
              style={[styles.text, styles.pokemonInfoValue, { color }]}
            >
              {generaName}
            </Text>

            <Text category="label" style={styles.text}>
              Types
            </Text>
          </View>

          <View
            style={[
              styles.pokemonInfo,
              {
                borderColor: color,
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text
              category="h4"
              style={[styles.text, styles.pokemonInfoValue, { color }]}
            >
              {pokemon?.height}
            </Text>

            <Text category="label" style={styles.text}>
              Height
            </Text>
          </View>

          <View style={styles.pokemonInfo}>
            <Text
              category="h4"
              style={[styles.text, styles.pokemonInfoValue, { color }]}
            >
              {pokemon?.weight}
            </Text>

            <Text category="label" style={styles.text}>
              Weight
            </Text>
          </View>
        </View>

        {/* Evolution */}
        <View style={styles.pokemonEvolutionContainer}>
          <Text
            category="h3"
            style={[styles.text, { color, marginBottom: 12 }]}
          >
            Evolution
          </Text>
        </View>

        {/* Stats */}
        <View>
          <Text
            category="h3"
            style={[styles.text, { color, marginBottom: 12 }]}
          >
            Base Stats
          </Text>
        </View>
      </View>
    </Layout>
  );
};

export default PokemonItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },

  main: {
    paddingHorizontal: 16,
  },

  // Evoltuon
  pokemonEvolutionContainer: {},

  // Info
  pokemonInfo: { flexGrow: 1 },
  pokemonInfoContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  pokemonInfoValue: { fontWeight: "bold" },

  text: { textAlign: "center" },
});
