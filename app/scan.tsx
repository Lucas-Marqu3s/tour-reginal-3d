import QRScanner from '@/components/qr-scanner';
import { regionsData } from '@/constants/regions';
import { router, Stack } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

export default function ScanScreen() {
  const handleScan = (data: string) => {
    const regionId = data.toLowerCase().trim();
    
    if (regionsData[regionId]) {
      router.push(`/region/${regionId}`);
    } else {
      Alert.alert(
        'Região não encontrada',
        `O QR Code "${data}" não corresponde a nenhuma região cadastrada.`,
        [
          { text: 'OK', onPress: () => router.back() }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Escanear QR Code',
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#fff',
        }} 
      />
      <QRScanner onScan={handleScan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});