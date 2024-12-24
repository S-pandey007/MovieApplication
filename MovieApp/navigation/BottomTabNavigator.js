import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <Pressable onPress={()=>navigation.navigate("Home")} style={styles.iconView}>
          <FontAwesome name="home" size={27} style={styles.icon} />
        </Pressable>
        <Pressable onPress={()=>navigation.navigate("Search")} style={styles.iconView}>
          <FontAwesome name="search" size={27} style={styles.icon} />
        </Pressable>
        <Pressable style={styles.iconView}>
          <FontAwesome name="user" size={27} style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: 'rgb(0, 0, 0)' 
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    borderTopWidth: 1,
    bottom:20,
    borderRadius: 30,

    // borderTopColor: 'rgba(255, 255, 255, 0.5)', // Transparent white border
  },
  iconView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: 'white', // White icon color
  },
});

export default BottomTabNavigator;