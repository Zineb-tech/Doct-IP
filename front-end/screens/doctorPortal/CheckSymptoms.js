import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import StyledButton from '../../components/StyledButton';

export default function CheckSymptoms() {
  const [symptoms, setSymptoms] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { bookingId } = route.params;

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3001/booking/booking/${bookingId}`);
        setSymptoms(response.data);
        console.log('Symptoms:', response.data);
      } catch (error) {
        console.error("Error fetching symptoms:", error);
      }
    };

    fetchSymptoms();
  }, [bookingId]);
  const navigateToDiagnose = () => {
    // Ensure patientId is available in symptoms and navigate with it
    if (symptoms.length > 0) {
      const patientId = symptoms[0].patientId; // Assuming patientId is available in the first symptom entry
      navigation.navigate("Diagnose", { patientId });
    } else {
      console.error("Symptoms array is empty or patientId not found.");
    }
  };


  const renderSymptomItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.username}</Text>
      {Object.keys(item.bodyParts).map((bodyPart, idx) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.label}>Affected Area: {bodyPart}</Text>
          <Text style={styles.text}>Symptoms: {item.bodyParts[bodyPart].symptoms.join(', ')}</Text>
          <Text style={styles.text}>Intensity: {item.bodyParts[bodyPart].intensity}</Text>
          <Text style={styles.text}>Description: {item.bodyParts[bodyPart].description}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Symptoms Details:</Text>
        <FlatList
          data={symptoms}
          renderItem={renderSymptomItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
          scrollEnabled={false} 
        />
        <StyledButton title="Diagnose" onPress={navigateToDiagnose} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  card: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Colors.primary,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
