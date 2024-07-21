import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Header from './component/Header';
import DoctorsList from './component/DoctorsList';
import Colors from '../../constants/Colors';

export default function HomePatientScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <DoctorsList/>
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
