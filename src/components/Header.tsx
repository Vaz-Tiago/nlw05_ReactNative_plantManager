import React from 'react';
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
  return(
    <View style={styles.container}>

      <View>

        <Text style={styles.greeting}>
          Olá,
        </Text>

        <Text style={styles.username}>
          Tiago
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
    width: 56,
    height: 56,
    borderRadius: 50
  }

})