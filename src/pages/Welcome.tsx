import React from 'react';
import { 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';


import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {
  const navigation = useNavigation();

  function handleStart(){
    navigation.navigate('UserIdentification')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
        </Text>

        <Image 
          source={wateringImg}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          Lembre sempre de regar as platinhas camarada!
        </Text>

        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.7}
          onPress={handleStart}
        >

          <Feather 
            name='chevron-right' 
            style={styles.buttonIcon} 
          />

        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    fontFamily: fonts.heading,
    lineHeight: 34,
    fontSize: 28,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
    paddingHorizontal: 20
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    width: 56,
    height: 56,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32
  },
  image: {
    height: Dimensions.get(`window`).width * 0.7, // Calcula baseado no device. Também metodo na tag imagem
  }
})