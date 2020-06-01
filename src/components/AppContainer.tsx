import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import RickAndMorty from '../screen/RickAndMortyCharacters';
import RickAndMortyData from '../screen/RickAndMortyData';



const Stack = createStackNavigator();

const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='RickAndMorty'>
        <Stack.Screen name='RickAndMorty' component={RickAndMorty} />
        <Stack.Screen name='RickAndMortyData' component={RickAndMortyData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigationContainer;