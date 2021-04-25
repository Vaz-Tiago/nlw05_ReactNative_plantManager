import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import { format, isBefore } from 'date-fns';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native';


import { Button } from '../components/Button';

import { PlantProps, savePlant } from '../libs/storage';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  plant: PlantProps
}

export function PlantSave(){
  const route = useRoute();
  const navigation = useNavigation();

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
  
  const { plant } = route.params as Params;


  function handleChangeTime(event: Event, dateTime: Date | undefined){
    if(Platform.OS === 'android'){
      setShowDatePicker(oldState => !oldState)
    }

    if(dateTime){
      // if(isBefore(dateTime, new Date())){
      //   setSelectedDateTime(new Date());
      //   return Alert.alert('Escolha uma data no futuro ⏰');
      // }

      setSelectedDateTime(dateTime);
    }

  }

  function handleOpenDateTimePickerForAndroid(){
    setShowDatePicker(oldValue => !oldValue)
  }

  async function handleSave(){
    try{
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('Confirmation', {
        title: 'Maravilha!',
        subtitle: 'Fica tranquilo que eu te lembro a hora de aguar essa plantinha.',
        buttonTitle: 'Muito Obrigado',
        icon: 'plant',
        nextScreen: 'MyPlants'
      });



    }catch{
      Alert.alert('Não foi possível cadastrar alerta 😭')
    }
  }



  return(
    <SafeAreaView style={styles.container}>

      <View style={styles.plantInfo}>

        <SvgFromUri
          uri={plant.photo}
          height={150}
          width={150}
        />

        <Text style={styles.plantName}>
          {plant.name}
        </Text>

        <Text style={styles.plantAbout}>
          {plant.about}
        </Text>

      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image
            source={waterdrop}
            style={styles.tipImage}
          />

          <Text style={styles.tipText}>
            {plant.water_tips}
          </Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado
        </Text>

        {showDatePicker &&
          <DateTimePicker
            value={selectedDateTime}
            mode='time'
            display='spinner'
            onChange={handleChangeTime}
          />
        }

        {Platform.OS === 'android' && (
          <TouchableOpacity 
            onPress={handleOpenDateTimePickerForAndroid}
            style={styles.dateTimePickerButton}
          >
            <Text style={styles.dataTimePickerText}>
              {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
            </Text>
          </TouchableOpacity>
        )}

        <Button 
          title="Cadastrar planta"
          onPress={handleSave}
        />

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  plantName: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 24,
    marginTop: 15
  },
  plantAbout: {
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    marginTop: 10
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },
  dateTimePickerButton:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  dataTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  }
});