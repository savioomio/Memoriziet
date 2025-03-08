import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initDatabase } from './services/database';
import AppNavigator from './navigation';
import { COLORS, SIZES } from './constants/theme';

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
        <StatusBar backgroundColor={COLORS.primary.main} barStyle="light-content" />
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <Text style={styles.title}>Memoriziet</Text>
            <ActivityIndicator size="large" color={COLORS.primary.main} style={styles.spinner} />
            <Text style={styles.loadingText}>Inicializando...</Text>
          </>
        )}
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={COLORS.primary.main} barStyle="light-content" />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.main,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary.main,
    marginBottom: SIZES.spacing.large,
  },
  spinner: {
    marginBottom: SIZES.spacing.medium,
  },
  loadingText: {
    fontSize: SIZES.fontSize.medium,
    color: COLORS.text.secondary,
  },
  errorText: {
    fontSize: SIZES.fontSize.medium,
    color: COLORS.accent.main,
    textAlign: 'center',
    paddingHorizontal: SIZES.spacing.large,
  },
});

export default App;