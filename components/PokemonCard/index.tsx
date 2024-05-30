import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { PokeAPI } from 'pokeapi-types';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { PokemonItemScreenNavigationProps } from '@/navigation';

import { extractIdFromUrl, getPokemonImage } from '@/utils/pokemon';
import { toCapitalize } from '@/utils/strings';

import { getPokemon } from '@/api/pokemon';

type Props = { pokemon: PokeAPI.NamedAPIResource };

function PokemonCard({ pokemon }: Props) {
  // State
  const [pokemonData, setPokemonData] = useState<PokeAPI.Pokemon | undefined>(undefined);

  // Navigation
  const navigation = useNavigation<PokemonItemScreenNavigationProps>();

  const id = extractIdFromUrl(pokemon.url);
  const pokemonImageUrl = getPokemonImage(id!, 'other-home-front_default');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemon(pokemon.name);

        setPokemonData(data);
      } catch (error) {
        setPokemonData(undefined);
        console.error('error', error);
      }
    };

    fetchPokemon();
  }, [pokemon.name]);

  // On Event
  const onPressCard = () => {
    if (id && pokemonData) {
      navigation.navigate('Pokemon Item', {
        id,
      });
    }
  };

  return (
    <TouchableOpacity onPress={() => onPressCard()} style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={{
            uri: pokemonImageUrl,
          }}
          style={styles.img}
        />
      </View>

      <Text style={styles.text}>{toCapitalize(pokemon.name)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 30,
    padding: 10,
    width: 150,
    height: 150,
  },

  img: { width: 100, height: 100 },

  text: {
    textAlign: 'center',
  },
});

export default PokemonCard;
