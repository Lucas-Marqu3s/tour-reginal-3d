import { regionsData } from '@/constants/regions';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoryItemsScreen() {
  const { regionId, categoryId, categoryName, regionName } = useLocalSearchParams<{
    regionId: string;
    categoryId: string;
    categoryName: string;
    regionName: string;
  }>();

  const region = regionsData[regionId];
  const items = region?.[categoryId as keyof typeof region] || [];

  const handleItemPress = (item: any) => {
    router.push({
      pathname: '/viewer',
      params: {
        itemData: JSON.stringify(item),
        regionName,
        categoryName,
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: categoryName || 'Categoria',
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#fff',
        }} 
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{categoryName}</Text>
        <Text style={styles.subtitle}>{regionName}</Text>

        <View style={styles.itemsContainer}>
          {Array.isArray(items) && items.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.itemCard, { borderLeftColor: item.cor }]}
              onPress={() => handleItemPress(item)}
            >
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.nome}</Text>
              </View>
              <Text style={styles.itemDescription}>{item.descricao}</Text>
              <View style={styles.viewButton}>
                <Text style={styles.viewButtonText}>Ver →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {(!Array.isArray(items) || items.length === 0) && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum item disponível nesta categoria
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  itemsContainer: {
    gap: 15,
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemHeader: {
    marginBottom: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  viewButton: {
    alignSelf: 'flex-end',
  },
  viewButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});