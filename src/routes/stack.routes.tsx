import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';

import colors from '../styles/colors';

// Modo de navegação por pillha
const StackRoutesNavigation = createStackNavigator();

const StackRoutes: React.FC = () => (
  <StackRoutesNavigation.Navigator
    headerMode='none'
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >

    <StackRoutesNavigation.Screen
      name='Welcome'
      component={Welcome}
    />

    <StackRoutesNavigation.Screen
      name='UserIdentification'
      component={UserIdentification}
    />

    <StackRoutesNavigation.Screen
      name='Confirmation'
      component={Confirmation}
    />

    <StackRoutesNavigation.Screen
      name='PlantSelect'
      component={PlantSelect}
    />

  </StackRoutesNavigation.Navigator>
)

export default StackRoutes;