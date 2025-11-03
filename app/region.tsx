import { categories, regionsData } from '@/constants/regions';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const region = regionsData[id];

  if (!region) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Região não encontrada</Text>
      </View>
    );
  }

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    router.push({
      pathname: '/category',
      params: { 
        regionId: id, 
        categoryId,
        categoryName,
        regionName: region.nome
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: region.nome,
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#fff',
        }} 
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{region.nome}</Text>
          <Text style={styles.subtitle}>Selecione uma categoria para explorar</Text>
        </View>

        <View style={styles.categoriesGrid}>
          {categories.map((category) => {
            const itemCount = region[category.id]?.length || 0;
            return (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { borderColor: category.cor }]}
                onPress={() => handleCategoryPress(category.id, category.nome)}
                disabled={itemCount === 0}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.nome}</Text>
                <Text style={styles.itemCount}>
                  {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 3,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  categoryIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
});