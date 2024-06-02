import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Favorite = {
  name: string;
  url: string;
};

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavorite = async (url: string) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
      favoritesArray = favoritesArray.filter((item: Favorite) => item.url !== url);
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      loadFavorites();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suas Universidades Favoritas</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => removeFavorite(item.url)}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.url}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
});
