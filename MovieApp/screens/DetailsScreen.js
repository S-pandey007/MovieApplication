import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

const DetailsScreen = ({ route, navigation }) => {
  const { movie } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.crossIconView}>
        <Entypo name="circle-with-cross" size={30} color="white" onPress={() => navigation.goBack()} />
      </View>
  
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
        
        <Image source={{ uri: movie.image?.original }} style={styles.image} />
        
        <View style={styles.infoRow}>
          <Text style={styles.text}>Premiered: {movie.premiered}</Text>
          <Text style={styles.text}>Language: {movie.language}</Text>
          
          <Text style={styles.text}>Runtime: {movie.runtime} min</Text>
        </View>
        <View style={styles.ratingView}>
            <Text style={styles.text}>Rating : {movie.rating?.average}</Text>
            <Feather style={{padding:2,bottom:3}} name="star" size={17} color="yellow" />
          </View>
        <View>
          <Text style={styles.text}>Genres:</Text>
          <View style={styles.genresRow}>
            {movie.genres?.map((genre) => (
              <Pressable onPress={()=>navigation.navigate("GenresResult",{genre})}  style={styles.genre} key={genre}>
                <Text style={styles.text} key={genre}>{genre}</Text>
              </Pressable>
            ))}
          </View>
        </View>
  
        
        
        <Text style={styles.title}>{movie.name}</Text>
        <Text style={styles.summary}>{movie.summary?.replace(/<[^>]+>/g, '')}</Text>
        {/* Add more movie details here as needed */}
        <View style={styles.buttonRow}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Play</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Add Watchlist</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  crossIconView: {
    position: 'absolute',
    top: 20,
    right: 14,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    marginBottom: 20,
    top:50,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  infoRow: {
    // flexDirection: 'row/',
    // justifyContent: 'space-between',
    
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius:7,
    // marginBottom:4,
    padding:6,
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:6,
  },
  genresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  genre: {
    borderRadius: 5,
    padding: 5,
    margin: 2,
    width: 80,
    alignItems: 'center',
    backgroundColor: '#E50914'
  },
  summary: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent:'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#E50914',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetailsScreen;