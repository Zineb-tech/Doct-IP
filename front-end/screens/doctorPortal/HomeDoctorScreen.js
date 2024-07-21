import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Header from './component/Header';
import ListAppointment from './component/ListAppointment';
import Colors from '../../constants/Colors';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <ListAppointment />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
