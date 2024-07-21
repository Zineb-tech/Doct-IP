import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Navigation from "./navigation/Navigation"

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
