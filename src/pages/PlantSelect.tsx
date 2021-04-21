import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  View,
  Text, 
  StyleSheet,
  FlatList
} from 'react-native';

import api from '../services/api';


import colors from '../styles/colors';
import fonts from '../styles/fonts';


import { Header } from '../components/Header';
import { EnvironmetButton } from '../components/EnvironmentButton';

interface EnvironmentProps {
  key: string,
  title: string
}

export function PlantSelect(){
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);

  useEffect(() => {
    async function fetchEnvironment(){
      try {
        const { data } = await api.get('plants_environments');
        setEnvironments(data)

      }catch(e){
        const data: EnvironmentProps[] = []
        data.push({
          key: 'teste',
          title: e.message
        })
        setEnvironments(data)
      }
    }

    fetchEnvironment();

  })
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
        </Text>

        <Text style={styles.subtitle}>
          Você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList
          data={environments}
          renderItem={({ item }) => (<EnvironmetButton title={item.title} />)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  }
})