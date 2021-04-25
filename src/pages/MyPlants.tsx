import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';

import { Header } from '../components/Header';
import { loadPlants, PlantProps } from '../libs/storage';


import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import { Load } from '../components/Load';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';


export function MyPlants(){
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(()=>{
    async function LoadStorageData(){
      const storagedPlants = await loadPlants();
      
      // formatDistance para pega a diferença de tempo.
      // FIXME: Lógica errada, pega a menor hora, mas nem sempre a mnor hora é a proxima a ser regada.
      // Essa ordenção é no geral, nao se baseia na hora atual
      const nextTime = formatDistance(
        new Date(storagedPlants[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${storagedPlants[0].name} daqui ${nextTime}.`
      );

      setMyPlants(storagedPlants);
      setLoading(false);

    }

    LoadStorageData();
  }, [])

  if(loading)
    return <Load />

  return (
    <SafeAreaView style={styles.content}>
      <Header />

      <View style={styles.spotlight}>
        <Image 
          source={waterdrop}
          style={styles.spoligthImage}
        />

        <Text style={styles.spoligthText} >
          {nextWatered}
        </Text>

      </View>


      <View style={styles.plants}>

        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>

        <View style={{flex: 1}}>

          <FlatList
            data={myPlants}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
              <PlantCardSecondary data={item} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30
  },
  spoligthImage: {
    width: 60,
    height: 60,
  },
  spoligthText: {
    fontFamily: fonts.text,
    color: colors.blue,
    paddingLeft: 15,
    textAlign: 'justify'
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }

})