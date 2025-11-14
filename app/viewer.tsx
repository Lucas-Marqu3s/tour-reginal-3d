import ARViewer from '@/components/ar-viewer';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ViewerScreen() {
  const { itemData, regionName, categoryName } = useLocalSearchParams<{
    itemData: string;
    regionName: string;
    categoryName: string;
  }>();

  const item = JSON.parse(itemData);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Realidade Aumentada',
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#fff',
        }}
      />
      <View style={styles.viewerContainer}>
        <ARViewer itemColor={item.cor} modelPath={item.modelo} />
      </View>

      <View style={styles.infoContainer}>
        <ScrollView contentContainerStyle={styles.infoContent}>
          <Text style={styles.breadcrumb}>
            {regionName} › {categoryName}
          </Text>
          <Text style={styles.itemName}>{item.nome}</Text>
          <Text style={styles.itemDescription}>{item.descricao}</Text>

          <View style={styles.instructionsBox}>
            <Text style={styles.instructionsTitle}>📱 Realidade Aumentada</Text>
            <Text style={styles.instructionsText}>
              Aponte a câmera para o ambiente ao seu redor e veja o objeto 3D se misturando com a realidade!
            </Text>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  viewerContainer: {
    flex: 2,
    backgroundColor: '#fff',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  infoContent: {
    padding: 20,
    paddingBottom: 80,
  },
  breadcrumb: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  instructionsBox: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 5,
  },
  instructionsText: {
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 20,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});