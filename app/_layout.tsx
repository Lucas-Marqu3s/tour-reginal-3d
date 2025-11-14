// IMPORTANTE: Carregar polyfills ANTES de qualquer outra coisa
import '../utils/blob-polyfill';

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Tour Regional 3D',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="scan" 
        options={{ title: 'Escanear QR Code' }} 
      />
      <Stack.Screen 
        name="region" 
        options={{ title: 'Região' }} 
      />
      <Stack.Screen 
        name="category" 
        options={{ title: 'Categoria' }} 
      />
      <Stack.Screen
        name="viewer"
        options={{ title: 'Realidade Aumentada' }}
      />
    </Stack>
  );
}