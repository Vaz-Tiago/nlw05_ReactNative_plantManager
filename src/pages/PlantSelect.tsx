import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { 
  View,
  Text, 
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';


import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


import { Load } from '../components/Load';
import { Header } from '../components/Header';
import { EnvironmetButton } from '../components/EnvironmentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { PlantProps } from '../libs/storage';


interface EnvironmentProps {
  key: string,
  title: string
}


export function PlantSelect(){
  const navigation = useNavigation();

  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPLants, setFilteredPLants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchEnvironment(){
      const { data } = await api.get('plants_environments?_sort=title&_order=asc');

      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ])

    }

    fetchEnvironment();
  },[])

  useEffect(()=> {
    fetchPlants();
  },[])

  async function fetchPlants(){
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if(!data)
      return setLoading(true);

    if(page > 1){
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPLants(oldValue => [...oldValue, ...data])
    }else {
      setPlants(data);
      setFilteredPLants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handeEnvironmentSelected(environment: string){
    setEnvironmentSelected(environment);

    if(environment === 'all'){
      return setFilteredPLants(plants)
    }

    const filter = plants.filter(item => item.environments.includes(environment));
    return setFilteredPLants(filter);
  }

  function handleFetchMore(distance: number){
    if(distance < 1)
      return;

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1)
    fetchPlants();
  }

  function handlePLantSelect(plant: PlantProps){
    navigation.navigate('PlantSave', { plant })
  }

  // Render
  if(loading)
    return <Load />

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

      <View style={styles.environmentList}>
        <FlatList
          data={environments}
          keyExtractor={item => String(item.key)}
          renderItem={({ item }) => (
            <EnvironmetButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={()=> handeEnvironmentSelected(item.key)}
            />)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPLants}
          keyExtractor={item => String(item.id)}
          renderItem={({item})=>(
            <PlantCardPrimary
              data={item}
              onPress={() => handlePLantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={ loadingMore ? <ActivityIndicator color={colors.green} /> : <></>}
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
    height: 60,
    justifyContent: 'center',
    paddingRight: 30,
    marginLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  }
})