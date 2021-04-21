import React from 'react';
import AppLoading from 'expo-app-loading'
import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';

import Routes from './src/routes';


export default function App() {
  // Necessário fazer no app para que as fontes fiquem disponíveis em toda aplicação
  // useFonts é um HOOK, primeiro item do array é um booleano
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  // Segura a tela de loading enquanto as fonts são carregadas
  if(!fontsLoaded)
    return <AppLoading />

  return (
    <Routes />
  )
}