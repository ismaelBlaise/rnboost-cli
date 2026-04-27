import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RNBoost</Text>
      <Text style={styles.subtitle}>Welcome to your new React Native app.</Text>
      <Link href="/(auth)/login" style={styles.link}>
        Get started →
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { fontSize: 36, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#444', textAlign: 'center', marginBottom: 32 },
  link: { fontSize: 16, color: '#5b8cff', fontWeight: '600' },
});
