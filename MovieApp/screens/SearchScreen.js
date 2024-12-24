import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const handleSearch = () => {
    setLoading(true);
    axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
      .then(response => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const renderMovie = ({ item }) => (
    <TouchableOpacity style={styles.movieContainer} onPress={() => navigation.navigate('Details', { movie: item.show })}>
      <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
      <View style={styles.movieDetails}>
        <Text style={styles.title}>{item.show.name}</Text>
        <Text style={styles.text}>Language: {item.show.language}</Text>
        <View style={styles.ratingView}>
          <Text style={styles.text}>Rating: {item.show.rating?.average}</Text>
          <Feather name="star" size={17} color="yellow" />
        </View>
        <Text style={styles.text}>Genres:</Text>
        <View style={styles.genresRow}>
          {item.show.genres?.map((genre) => (
            <View style={styles.genre} key={genre}>
              <Text style={styles.text} key={genre}>{genre}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.summary} numberOfLines={3}>{item.show.summary?.replace(/<[^>]+>/g, '')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Search Movies</Text>
      </View> */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#E50914" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a movie..."
          placeholderTextColor="gray"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#E50914" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={item => item.show.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  header: {
    backgroundColor: '#E50914',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    padding:7
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: 'black', // Ensure the text color is black
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 10,
  },
  thumbnail: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  movieDetails: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: 'white', // Ensure the text color is white
    marginBottom: 5,
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  genresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  genre: {
    backgroundColor: '#E50914',
    borderRadius: 5,
    padding: 5,
    margin: 2,
    alignItems: 'center',
  },
  summary: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
});

export default SearchScreen;