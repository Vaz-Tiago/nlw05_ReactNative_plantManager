import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { 
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from 'react-native';


import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/core';


export function UserIdentification(){
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  async function handleConfirmation(){
    if(!name)
      return Alert.alert(`Me diga o seu nome 😥`);

    try {
      await AsyncStorage.setItem('@plantManager:user', name);
      navigation.navigate('Confirmation', {
        title: 'Prontinho!!!',
        subtitle: `Bora cuidar dessas plantinhas ${name}!!!`,
        buttonTitle: 'Começar',
        icon: 'smileStar',
        nextScreen: 'PlantSelect'
      });

    }catch{
      Alert.alert('Não foi possível salvar o seu nome 😭')
    }
  }

  function handleInputFocus(){
    setIsFocused(true)
  }

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputChange(value: string){
    setIsFilled(!!value);
    setName(value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
       style={styles.container}
       behavior={Platform.OS === 'ios' ? 'padding': 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.content}>

            <View style={styles.form}>

              <View style={styles.header}>

                <Text style={styles.emoji}>
                  {isFilled ? '😁' : '😃'}
                </Text>

                <Text style={styles.title}>
                  Como podemos {'\n'}
                  chamar você?
                </Text>

              </View>

              <TextInput 
                style={[
                  styles.input,
                  (isFocused || isFilled) && {borderColor: colors.green}
                ]}
                placeholder="Digite seu nome"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button 
                  title='Confirmar'
                  onPress={handleConfirmation}
                />
              </View>

            </View>

          </View>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center'
  },
  header: {
    alignItems: 'center'
  },
  emoji:{
    fontSize: 78,
    marginBottom: 20
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading
  },
  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20
  }
})