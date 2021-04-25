import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications';
import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';

import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';


export default function App() {
  // Necessário fazer no app para que as fontes fiquem disponíveis em toda aplicação
  // useFonts é um HOOK, primeiro item do array é um booleano
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(() => {
    // // Listener para chegada de notificações
    // const subscription = Notifications.addNotificationReceivedListener(
    //   async notification => {
    //     const data = notification.request.content.data.plant as PlantProps;
    //     console.log(data);
        
    //   }
    // );

    // return () => subscription.remove();

    // async function notifications() {
 
    //   // // Cancela todas as notificações
    //   await Notifications.cancelAllScheduledNotificationsAsync();
    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log('NOTIFICAÇÕES: ', data);
      
    // }

    // notifications();
  },[])

  // Segura a tela de loading enquanto as fonts são carregadas
  if(!fontsLoaded)
    return <AppLoading />

  return (
    <Routes />
  )
}