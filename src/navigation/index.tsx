import React from 'react';
import { View, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import LearningScreen from '../screens/LearningScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { COLORS } from '../constants/theme';

// Definição dos parâmetros para as rotas de navegação
export type RootStackParamList = {
  Home: undefined;
  Learning: undefined;
  Review: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary.main,
          },
          headerTintColor: COLORS.text.contrast,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: {
            backgroundColor: COLORS.background.main
          }
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/icone.png')} // Atualize o caminho da imagem conforme necessário
                  style={{ width: 40, height: 40, resizeMode: 'contain' }}
                />
                <Text style={{ marginLeft: 10, color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                  Memoriziet
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen 
          name="Learning" 
          component={LearningScreen} 
          options={{ title: 'Aprender Palavras' }}
        />
        <Stack.Screen 
          name="Review" 
          component={ReviewScreen} 
          options={{ title: 'Revisar Palavras' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Configurações' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;