import { useEffect, useState } from "react";

import { useLocalSearchParams } from "expo-router";
import { PokeAPI } from "pokeapi-types";
import { Image, StyleSheet } from "react-native";
import { SizableText, Text, View } from "tamagui";

import {
  extractPokemonGenera,
  extractPokemonStats,
  getPokemonImage,
} from "@/utils/pokemon";
import { consoleLogStringsToJson, toCapitalize } from "@/utils/strings";

import { getPokemon, getPokemonSpecies } from "@/api/pokemon";

function Title({ color, data, label }) {
  return (
    <View
      style={[
        styles.pokemonInfo,
        // {
        //   borderColor: color,
        //   borderLeftWidth: 1,
        //   borderRightWidth: 1,
        // },
      ]}
    >
      <SizableText
        size="$8"
        style={[styles.text, styles.pokemonInfoValue, { color }]}
      >
        {data}
      </SizableText>

      <SizableText style={styles.text}>{label}</SizableText>
    </View>
  );
}

const PokemonItemScreen = ({ route }: { route: any }) => {
  // State
  const [pokemon, setPokemon] = useState<PokeAPI.Pokemon | undefined>(
    undefined,
  );
  const [generaName, setGeneraName] = useState("");
  const [stats, setStats] = useState([]);
  const [color, setColor] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Navigation
  const { id } = useLocalSearchParams<{ id: string }>();

  const pokemonImageUrl = getPokemonImage(id, "other-home-front_default");

  const fetchPokemon = async (id: string) => {
    try {
      const pokemonData = await getPokemon(id);
      const pokemonSpecies = await getPokemonSpecies(id);

      setPokemon(pokemonData);
      setGeneraName(extractPokemonGenera(pokemonSpecies));
      setStats(extractPokemonStats(pokemon?.stats || []));
      setColor(pokemonSpecies?.color.name);
      setIsLoading(false);
    } catch (error) {
      setPokemon(undefined);
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPokemon(id);
    }
  }, [id]);

  if (!pokemon || isLoading) {
    return null;
  }

  consoleLogStringsToJson(stats);

  return (
    <View style={styles.container}>
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

        <SizableText size="$10" style={styles.text}>
          {toCapitalize(pokemon.name)}
        </SizableText>
      </View>

      {/* Main */}
      <View style={styles.main}>
        {/* Info */}
        <View style={styles.pokemonInfoContainer}>
          <Title color={color} data={generaName} label="Types" />

          <Title color={color} data={pokemon?.height} label="Height" />

          <Title color={color} data={pokemon?.weight} label="Weight" />
        </View>

        {/* Evolution */}
        <View style={styles.pokemonEvolutionContainer}>
          <SizableText
            size="$6"
            style={[styles.text, { color, marginBottom: 12 }]}
          >
            Evolution
          </SizableText>
        </View>

        {/* Stats */}
        <View>
          <SizableText
            size="$6"
            style={[styles.text, { color, marginBottom: 12 }]}
          >
            Base Stats
          </SizableText>

          {stats.map((stat, index) => (
            <View key={index}>
              <Text>{stat.stat_name}</Text>

              <Text>{stat.base_stat}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
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

  // Evolution
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
