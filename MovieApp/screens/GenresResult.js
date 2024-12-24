import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';
import axios from 'axios';

const GenresResult = ({ route, navigation }) => {
  const { genre } = route.params;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.tvmaze.com/search/shows?q=${genre}`)
      .then(response => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [genre]);

  const renderMovie = ({ item }) => (
    <View style={styles.movieContainer}>
      <Pressable onPress={() => navigation.navigate('Details', { movie: item.show })}>
        <Image
          source={{ uri: item.show.image ? item.show.image.medium : 'https://via.placeholder.com/150' }}
          style={styles.thumbnail}
          onError={(e) => console.warn('Image load error:', e.nativeEvent.error)}
        />
        <Text style={styles.title}>{item.show.name}</Text>
      </Pressable>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.genreText}>{genre}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#E50914" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={item => item.show.id.toString()}
          numColumns={2}
          renderItem={renderMovie}
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
  genreText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    top:10
  },
  movieContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: '90%',
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  noImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default GenresResult;