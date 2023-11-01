import { useEffect, useState } from 'react';

import { Layout, Text } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';

// API
import {
  getPokemon,
  getPokemonEggGroup,
  getPokemonEvolution,
  getPokemonSpecies,
} from 'api/pokemon';

// Components
import Chip from 'components/Chip';

// Constants
import { POKEMON_TYPE_ICONS } from 'constants/pokemonTypeIcon';

// Utils
import {
  extractPokemonEvolution,
  extractPokemonGenera,
  extractPokemonMoves,
  extractPokemonStats,
  extractPokemonTypes,
  extractIdFromUrl,
  getPokemonImage,
} from 'utils/pokemon';
import { consoleLogStringsToJson, toCapitalize } from 'utils/strings';

const PokemonItemScreen = ({ navigation, route }) => {
  // State
  const [pokemon, setPokemon] = useState({ name: '' });
  const [generaName, setGeneraName] = useState('');
  const [types, setTypes] = useState([]);
  const [species, setSpecies] = useState({});
  const [stats, setStats] = useState([]);
  const [color, setColor] = useState('');

  // Navigation
  const { id } = route.params;

  const pokemonImageUrl = getPokemonImage(id, 'other-home-front_default');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemonData = await getPokemon(id);
        const { data: pokemonSpecies } = await getPokemonSpecies(id);
        const pokemonChainId = extractIdFromUrl(pokemonSpecies.evolution_chain.url);
        const { data: PokemonChain } = await getPokemonEvolution(pokemonChainId);
        extractPokemonEvolution(PokemonChain);

        setPokemon(pokemonData);
        setTypes(extractPokemonTypes(pokemonData));
        consoleLogStringsToJson(pokemonData);
        setSpecies(pokemonSpecies);
        // consoleLogStringsToJson(PokemonChain);
        setStats(extractPokemonStats(pokemonData));
        setGeneraName(extractPokemonGenera(pokemonSpecies));
        setColor(pokemonSpecies.color.name);
      } catch (error) {
        setPokemon({});
        console.error('error', error);
      }
    };

    fetchPokemon();
  }, []);

  if (pokemon === null) {
    return null;
  }

  return (
    <Layout style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{
              uri: pokemonImageUrl,
            }}
            style={{ width: 250, height: 250 }}
          />
        </View>

        {/* <Text category="h1" style={styles.text}>
          {toCapitalize(pokemon.name)}
        </Text> */}
      </View>

      {/* Main */}
      <View style={styles.main}>
        {/* PokemonTypes */}
        <View style={styles.pokemonTypesContainer}>
          {types.map((typeName, index) => (
            <Chip
              color={POKEMON_TYPE_ICONS[typeName].color}
              icon={POKEMON_TYPE_ICONS[typeName].icon}
              key={typeName}
              style={{
                marginRight: index !== types.length && 8,
              }}
              text={toCapitalize(typeName)}
              variant="outlined"
            />
          ))}
        </View>

        {/* Info */}
        <View style={styles.pokemonInfoContainer}>
          <View style={styles.pokemonInfo}>
            <Text category="h4" style={[styles.text, styles.pokemonInfoValue, { color }]}>
              {generaName}
            </Text>

            <Text category="label" style={styles.text}>
              Species
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
            ]}>
            <Text category="h4" style={[styles.text, styles.pokemonInfoValue, { color }]}>
              {pokemon?.height}
            </Text>

            <Text category="label" style={styles.text}>
              Height
            </Text>
          </View>

          <View style={styles.pokemonInfo}>
            <Text category="h4" style={[styles.text, styles.pokemonInfoValue, { color }]}>
              {pokemon?.weight}
            </Text>

            <Text category="label" style={styles.text}>
              Weight
            </Text>
          </View>
        </View>

        {/* Evolution */}
        <View style={styles.pokemonEvolutionContainer}>
          <Text category="h3" style={[styles.text, { color, marginBottom: 12 }]}>
            Evolution
          </Text>
        </View>

        {/* Stats */}
        <View>
          <Text category="h3" style={[styles.text, { color, marginBottom: 12 }]}>
            Base Stats
          </Text>

          <View style={styles.pokemonStatsContainer}>
            <View style={[styles.pokemonStatsContainer__Left, { borderColor: color }]}>
              {stats.map((stat) => (
                <View key={stat.name} style={styles.stats}>
                  <Text style={[styles.text, { color }]}>{stat.name.toUpperCase()}</Text>
                </View>
              ))}
            </View>

            <View>
              {stats.map((stat) => (
                <View key={stat.name} style={styles.stats}>
                  <Text style={[styles.text, { color }]}>{stat.value}</Text>
                </View>
              ))}
            </View>
          </View>
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
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  main: {
    paddingHorizontal: 16,
  },

  // Info
  pokemonInfoContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  pokemonInfo: { flexGrow: 1 },
  pokemonInfoValue: { fontWeight: 'bold' },

  // Types
  pokemonTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },

  // Evoltuon
  pokemonEvolutionContainer: {},

  // Stats
  pokemonStatsContainer: { flexDirection: 'row' },
  pokemonStatsContainer__Left: {
    borderRightWidth: 1,
    paddingRight: 24,
    marginRight: 24,
  },
  stats: { alignItems: 'flex-start', marginBottom: 6 },

  text: { textAlign: 'center' },
});
