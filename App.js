import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider } from './src/context/AppContext';

import HomeScreen from './src/screens/HomeScreen';
import ProdutosScreen from './src/screens/ProdutosScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';
import EstoqueScreen from './src/screens/EstoqueScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarShowLabel: true,
              tabBarActiveTintColor: '#C9A227',
              tabBarInactiveTintColor: '#fff',
              tabBarStyle: {
                backgroundColor: '#11060A',
                borderTopColor: 'rgba(201,162,39,0.25)',
                borderTopWidth: 1,
              },
              tabBarIcon: ({ color, size }) => {
                let iconName = 'home';
                if (route.name === 'Home') iconName = 'home';
                if (route.name === 'Produtos') iconName = 'egg';
                if (route.name === 'Carrinho') iconName = 'cart';
                if (route.name === 'Estoque') iconName = 'cube';
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Produtos" component={ProdutosScreen} />
            <Tab.Screen name="Carrinho" component={CarrinhoScreen} />
            <Tab.Screen name="Estoque" component={EstoqueScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}

