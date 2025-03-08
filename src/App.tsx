import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { initDatabase } from './services/database';
import AppNavigator from './navigation';

const App: React.FC = () => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Inicializa o banco de dados
        await initDatabase();
        
        // Simula um pequeno atraso para mostrar a tela de splash
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setReady(true);
      } catch (err) {
        console.error('Erro ao inicializar o app:', err);
        setError('Falha ao inicializar o aplicativo. Por favor, tente novamente.');
      }
    };

    prepare();
  }, []);

  if (!ready) {
    return (
      <View style={styles.container}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <Text style={styles.title}>Vocabulary App</Text>
            <ActivityIndicator size="large" color="#4caf50" style={styles.spinner} />
            <Text style={styles.loadingText}>Inicializando...</Text>
          </>
        )}
      </View>
    );
  }

  return <AppNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 24,
  },
  spinner: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#e53935',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default App;