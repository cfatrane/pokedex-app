import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

type RootStackParamList = {
  'Pokemon List': undefined;
  'Pokemon Item': { id: string };
};

export type PokemonListScreenProps = NativeStackScreenProps<RootStackParamList, 'Pokemon List'>;
export type PokemonItemScreenProps = NativeStackScreenProps<RootStackParamList, 'Pokemon Item'>;

export type PokemonItemScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Pokemon Item'
>;
