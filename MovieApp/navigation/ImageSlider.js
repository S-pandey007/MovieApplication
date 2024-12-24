import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex === movies.length - 1 ? 0 : prevIndex + 1;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
        }
        return nextIndex;
      });
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, [movies]);

  const onScroll = (event) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
    );
    if (slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
      >
        {movies.map((item, index) => (
          <Image
            key={index}
            source={{ uri: item.show.image ? item.show.image.original : 'https://via.placeholder.com/150' }}
            style={styles.image}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {movies.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? '#fff' : '#888' },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
  },
  image: {
    width,
    height: 400,
    resizeMode: 'contain',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default ImageSlider;