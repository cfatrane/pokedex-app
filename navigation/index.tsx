import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PokemonListScreen from 'screens/PokemonListScreen';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

type RootStackParamList = {
  'Pokemon List': undefined;
};

export type PokemonListScreenProps = NativeStackScreenProps<RootStackParamList, 'Pokemon List'>;

const HomeNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: true }}>
      <Screen component={PokemonListScreen} name="Pokemon List" />
    </Navigator>
  );
};

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);

export default AppNavigator;
