import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Colors from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';

const PlanSurgery = () => {
  const [patient, setPatient] = useState('');
  const [surgeryType, setSurgeryType] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [duration, setDuration] = useState('');
  const [surgeons, setSurgeons] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [procedureSteps, setProcedureSteps] = useState('');
  const [checklist, setChecklist] = useState({ medications: '', consentForms: '', preOpTests: '' });

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSubmit = () => {
    // Handle form submission logic
    alert('Surgical Plan Submitted');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Create New Surgical Plan</Text>

        <Text style={styles.label}>Patient Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Search or Select Patient"
          value={patient}
          onChangeText={setPatient}
        />

        <Text style={styles.label}>Surgery Details</Text>
        <Picker
          selectedValue={surgeryType}
          style={styles.picker}
          onValueChange={(itemValue) => setSurgeryType(itemValue)}
        >
          <Picker.Item label="Select Surgery Type" value="" />
          <Picker.Item label="Appendectomy" value="appendectomy" />
          <Picker.Item label="Cholecystectomy" value="cholecystectomy" />
        </Picker>

        <View style={styles.dateTimeRow}>
          <Text style={styles.label}>Date & Time</Text>
          <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Duration (hours)"
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />

        <Text style={styles.label}>Surgical Plan</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Step-by-step procedure"
          multiline
          numberOfLines={4}
          value={procedureSteps}
          onChangeText={setProcedureSteps}
        />

        <Text style={styles.label}>Pre-Surgery Checklist</Text>
        <TextInput
          style={styles.input}
          placeholder="Medications"
          value={checklist.medications}
          onChangeText={(text) => setChecklist({ ...checklist, medications: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Consent Forms"
          value={checklist.consentForms}
          onChangeText={(text) => setChecklist({ ...checklist, consentForms: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Pre-op Tests"
          value={checklist.preOpTests}
          onChangeText={(text) => setChecklist({ ...checklist, preOpTests: text })}
        />

        <Button title="Submit Plan" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.primary,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    height: 100,
  },
});

export default PlanSurgery;
