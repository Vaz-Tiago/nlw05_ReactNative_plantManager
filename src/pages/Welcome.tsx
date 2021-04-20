import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'


import wateringImg from '../assets/watering.png'
import { Button } from '../Components/Button';
import colors from '../styles/colors';

export function Welcome(){
  return(
    <SafeAreaView style={styles.container}>

        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas {'\n'}
          de forma fácil
        </Text>

        <Image source={wateringImg} />

        <Text style={styles.subtitle}>
          Lembre sempre de regar as platinhas camarada!
        </Text>

      <Button title='>' />

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
    paddingHorizontal: 20
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading
  },
  image: {
    height: 292,
    width: 284
  }
})