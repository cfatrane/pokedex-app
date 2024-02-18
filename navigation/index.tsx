import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PokemonItemScreen from 'screens/PokemonItemScreen';
import PokemonListScreen from 'screens/PokemonListScreen';

import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

type RootStackParamList = {
  'Pokemon List': undefined;
  'Pokemon Item': { id: string };
};

export type PokemonListScreenProps = NativeStackScreenProps<RootStackParamList, 'Pokemon List'>;
export type PokemonItemScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Pokemon Item'
>;

const HomeNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: true }}>
      <Screen component={PokemonListScreen} name="Pokemon List" />

      <Screen
        component={PokemonItemScreen}
        name="Pokemon Item"
        // options={({ route }) => ({
        //   title: route?.params?.name,
        // })}
      />
    </Navigator>
  );
};

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);

export default AppNavigator;
