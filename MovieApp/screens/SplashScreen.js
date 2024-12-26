import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    if (navigation) {
      const timer = setTimeout(() => {
        navigation.replace('Home');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Lottie Animation */}
      <LottieView
        source={require('../assets/Animation - 1735014228383.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Background color
  },
  animation: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    color: '#333', // Text color
    fontWeight: 'bold',
  },
});

export default SplashScreen;
