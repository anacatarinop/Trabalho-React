import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type University = {
  name: string;
  web_pages: string[];
};

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [country, setCountry] = useState<string>('');
  const [university, setUniversity] = useState<string>('');
  const [universities, setUniversities] = useState<University[]>([]);

  const searchUniversities = async () => {
    try {
      const response = await axios.get(`http://universities.hipolabs.com/search?country=${country}&name=${university}`);
      setUniversities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addFavorite = async (university: University) => {
    try {
      const favorites = JSON.parse(await AsyncStorage.getItem('favorites') || '[]');
      favorites.push({ name: university.name, url: university.web_pages[0] });
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encontre Universidades</Text>
      <TextInput
        placeholder="Nome do País"
        value={country}
        onChangeText={setCountry}
        style={styles.input}
      />
      <TextInput
        placeholder="Nome da Universidade"
        value={university}
        onChangeText={setUniversity}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={searchUniversities}>
          <Text style={styles.buttonText}>PESQUISAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Favorites')}>
          <Text style={styles.buttonText}>FAVORITOS</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={universities}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => addFavorite(item)}>
            <Text style={styles.itemText}>{item.name}</Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
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
