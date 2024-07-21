import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import StyledButton from "../../components/StyledButton";


export default function SympAndBookingEntry({ route }) {
  const { symptoms, bookingData } = route.params;
  const navigation = useNavigation();

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : '';
  };

  const formattedDate = bookingData ? formatDate(bookingData.selectedDate) : '';

 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Congratulations!</Card.Title>
        <Text>You are successfully booked</Text>
        <Text style={styles.bookingText}>Booked on: {formattedDate}</Text>
        </Card>
        
        <View style={styles.section}>
          <View style={styles.format}>
            <Text style={styles.sectionTitle}>Symptoms Details :</Text>
            <TouchableOpacity onPress={() => navigation.navigate("PainMap")} >
              <Text style={styles.editTextStyle}>Edit</Text>
            </TouchableOpacity>
          </View>        
          {symptoms && symptoms.length > 0 ? (
            symptoms.map((symptom, index) => (
              <View key={index} >
                <View style={styles.row}>
                  <Icon name="stethoscope" size={20} style={styles.icon} />
                  <Text style={styles.label}>Affected Area:</Text>
                </View>
                <Text style={styles.text}>{symptom.slug}</Text>
                <View style={styles.row}>
                  <Icon name="heartbeat" size={20} style={styles.icon} />
                  <Text style={styles.label}>Symptoms:</Text>
                </View>
                <Text style={styles.text}>{symptom.symptoms}</Text>
                <View style={styles.row}>
                  <Icon name="fire" size={20} style={styles.icon} />
                  <Text style={styles.label}>Intensity:</Text>
                </View> 
                <Text style={styles.text}>{symptom.intensity}</Text>
                <View style={styles.row}>
                  <Icon name="comment" size={20} style={styles.icon} />
                  <Text style={styles.label}>Description:</Text>
                </View>
                <Text style={styles.text}>{symptom.description}</Text>                
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No symptoms recorded.</Text>
          )}
          <StyledButton title="Next" onPress={()=>{navigation.navigate("SignIn")}} />
        </View>


        
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  card: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    padding: 20,
    color: Colors.primary,
  },
  icon: {
    marginRight: 10,
    color: Colors.primary, 
    paddingStart:20
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    paddingStart: 50
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,

  },
  noDataText: {
    fontSize: 14,
    color: Colors.secondary,
  },
  bookingText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop:10,
    color: Colors.textPrimary,
  },
  format:{
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  editTextStyle:{
    color:Colors.titleColor,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop:30
  },
});
