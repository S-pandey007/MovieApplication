import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// import { SliderBox } from 'react-native-image-slider-box'; // Correct import for SliderBox
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import ImageSlider from '../navigation/ImageSlider';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

  const renderHorizontalList = (movies, title) => (
    <View style={styles.section}>
      <Text style={styles.SectionHeader}>{title}</Text>
      <FlatList
        data={movies}
        horizontal
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item.show })}>
            <Image source={{ uri: item.show.image ? item.show.image.medium : 'https://via.placeholder.com/150' }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>Movie Zone</Text>
      </View>

      
      <ScrollView style={styles.container}>
      <View>
        <ImageSlider/>
      </View>
        {renderHorizontalList(movies.slice(0, 10), 'Trending Now')}
        {renderHorizontalList(movies.slice(0, 10), 'New Releases')}
        {renderHorizontalList(movies.slice(0, 10), 'Popular on Netflix')}
        {renderHorizontalList(movies.slice(0, 10), "Today's Top Picks for You")}
      </ScrollView>

      <BottomTabNavigator style={{backgroundColor:'black'}}/>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 330,
    height: 200,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  HeaderContainer: {
    padding: 20,
    backgroundColor: '#E50914',
    alignItems: 'center',
  },
  HeaderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 20,
  },
  SectionHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  thumbnail: {
    width: 100,
    height: 150,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default HomeScreen;