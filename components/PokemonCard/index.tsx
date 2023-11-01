import React from 'react';

import { PokeAPI } from 'pokeapi-types';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Utils
import { extractIdFromUrl, getPokemonImage } from 'utils/pokemon';
import { toCapitalize } from 'utils/strings';

type Props = { pokemon: PokeAPI.NamedAPIResource };

function PokemonCard({ pokemon }: Props) {
  const id = extractIdFromUrl(pokemon.url);
  const pokemonImageUrl = getPokemonImage(id!, 'other-home-front_default');

  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={{
            uri: pokemonImageUrl,
          }}
          style={styles.img}
        />
      </View>

      <Text style={styles.text}>
        {toCapitalize(pokemon.name)}

        {id}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
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
