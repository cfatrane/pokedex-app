const SPRITES_BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const extractIdFromUrl = (url = "") => {
  if (url.length === 0) return;

  const urlSplit = url?.split("/");
  const id = urlSplit[urlSplit.length - 2];

  return id;
};

export const extractPokemonGenera = (pokemonSpecies, lang = "en") => {
  const { genera } = pokemonSpecies;

  const generaName = genera
    .find((elem) => elem.language.name === lang)
    .genus.split(" ")[0];

  return generaName;
};

export const extractPokemonTypes = (pokemon) => {
  const typesNames = pokemon?.types.map((type) => type.type.name);

  return typesNames;
};

export const getPokemonImage = (id: string, value = "front_default") => {
  let imageIrl = "";

  switch (value) {
    case "back_default":
      imageIrl = `${SPRITES_BASE_URL}/back/${id}.png`;
      break;
    case "back_female":
      // imageIrl = `${SPRITES_BASE_URL}/back/${id}.png`;
      break;
    case "back_shiny":
      imageIrl = `${SPRITES_BASE_URL}/back/shiny/${id}.png`;
      break;
    case "back_shiny_female":
      // imageIrl = `${SPRITES_BASE_URL}/back/shiny/${id}.png`;
      break;
    case "front_default":
      imageIrl = `${SPRITES_BASE_URL}/${id}.png`;
      break;
    case "front_female":
      // imageIrl = `${SPRITES_BASE_URL}/${id}.png`;
      break;
    case "front_shiny":
      imageIrl = `${SPRITES_BASE_URL}/shiny/${id}.png`;
      break;
    case "front_shiny_female":
      imageIrl = `${SPRITES_BASE_URL}/shiny/${id}.png`;
      break;
    case "other-dream_world-front_default":
      imageIrl = `${SPRITES_BASE_URL}/other/dream-world/${id}.svg`;
      break;
    case "other-dream_world-front_female":
      // imageIrl = `${SPRITES_BASE_URL}/other/dream-world/${id}.svg`;
      break;
    case "other-home-front_default":
      imageIrl = `${SPRITES_BASE_URL}/other/home/${id}.png`;
      break;
    case "other-home-front_female":
      // imageIrl = `${SPRITES_BASE_URL}/other/home/${id}.png`;
      break;
    case "other-home-front_shiny":
      imageIrl = `${SPRITES_BASE_URL}/other/home/shiny/${id}.png`;
      break;
    case "other-home-front_shiny_female":
      // imageIrl = `${SPRITES_BASE_URL}/other/home/shiny/${id}.png`;
      break;
    case "other-official-artwork-front_default":
      imageIrl = `${SPRITES_BASE_URL}/other/official-artwork/${id}.png`;
      break;

    default:
      break;
  }

  return imageIrl;
};
