import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pesquisar Universidades' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Universidades Favoritas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
