import React from "react";

import { Link, router } from "expo-router";
import { PokeAPI } from "pokeapi-types";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { extractIdFromUrl, getPokemonImage } from "@/utils/pokemon";
import { toCapitalize } from "@/utils/strings";

type Props = { pokemon: PokeAPI.NamedAPIResource };

function PokemonCard({ pokemon }: Readonly<Props>) {
  const id = extractIdFromUrl(pokemon.url);
  const pokemonImageUrl = getPokemonImage(id!, "other-home-front_default");

  const onPressCard = () => {
    router.push("/login");
  };

  return (
    <Link
      asChild
      href={{
        pathname: "/pokemons/[id]",
        params: {
          id: id,
        },
      }}
    >
      <TouchableOpacity onPress={onPressCard} style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={{
              uri: pokemonImageUrl,
            }}
            style={styles.img}
          />
        </View>

        <Text style={styles.text}>{toCapitalize(pokemon.name)}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 150,
    marginBottom: 30,
    padding: 10,
    width: 150,
  },

  img: { height: 100, width: 100 },

  text: {
    textAlign: "center",
  },
});

export default PokemonCard;
