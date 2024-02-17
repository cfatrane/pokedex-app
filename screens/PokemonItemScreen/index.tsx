import { useEffect, useState } from 'react';

import { Layout, Text } from '@ui-kitten/components';
import { PokeAPI } from 'pokeapi-types';
import { Image, StyleSheet, View } from 'react-native';

// API
import { PokemonItemScreenProps } from 'navigation/types';

import { getPokemon, getPokemonSpecies } from 'api/pokemon';

// Utils
import { getPokemonImage } from 'utils/pokemon';
import { toCapitalize } from 'utils/strings';

const PokemonItemScreen = ({ navigation, route }: PokemonItemScreenProps) => {
  // State
  const [pokemon, setPokemon] = useState<PokeAPI.Pokemon | undefined>(undefined);
  const [color, setColor] = useState('');

  // Navigation
  const { id } = route.params;

  const pokemonImageUrl = getPokemonImage(id, 'other-home-front_default');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemonData = await getPokemon(id);
        setPokemon(pokemonData);

        const pokemonSpecies = await getPokemonSpecies(id);

        setColor(pokemonSpecies.color.name);
      } catch (error) {
        setPokemon(undefined);
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

        <Text category="h1" style={styles.text}>
          {toCapitalize(pokemon.name)}
        </Text>
      </View>

      {/* Main */}
      <View style={styles.main}>
        {/* Info */}
        <View style={styles.pokemonInfoContainer}>
          <View style={styles.pokemonInfo}>
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

  // Evoltuon
  pokemonEvolutionContainer: {},

  text: { textAlign: 'center' },
});
