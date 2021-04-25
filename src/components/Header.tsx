import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { 
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import userImg from '../assets/tiago.png'


export function Header(){
  const [userName, setUserName] = useState<string>();

  useEffect(()=> {
    async function loadStorageUserName(){
      const user = await AsyncStorage.getItem('@plantManager:user');
      setUserName(user || 'Não Cadastrado');
    }
    loadStorageUserName();

  }, []);

  return(
    <View style={styles.container}>

      <View>

        <Text style={styles.greeting}>
          Olá,
        </Text>

        <Text style={styles.username}>
          {userName}
        </Text>

      </View>

      <Image source={userImg} style={styles.userImage} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.background,
  },
  greeting: {
    fontSize: 25,
    color: colors.heading,
    fontFamily: fonts.text
  },
  username: {
    fontSize: 25,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 30
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 50
  }

})