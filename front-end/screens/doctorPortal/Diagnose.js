import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CustomInput from '../../components/CustomInput';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Diagnose() {
  const route = useRoute();
  const { patientId } = route.params; 
  const navigation = useNavigation();

  const [diseaseStatus, setDiseaseStatus] = useState('');
  const [disease, setDisease] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [solution, setSolution] = useState('');
  const [labTests, setLabTests] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('');

  const handleDiseaseStatusChange = (value) => {
    setDiseaseStatus(value);
  };

  const handleSubmit = async() => {
    const diagnosisDetails = {
      patientId,
      disease,
      description,
      reason,
      solution,
      labTests,
      additionalNotes,
      urgencyLevel,
    };
    console.log('Diagnosis Details:', diagnosisDetails);
    navigation.navigate("PlanSurgery");
  try {
    const response = await axios.post('http://10.0.2.2:3001/diagnosis/diagnosis', diagnosisDetails);
  } catch (error) {
    console.error('Error submitting diagnosis:', error);
  }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Diagnosis Form</Text>
            <View style={styles.selectBox}>
                <RNPickerSelect
                onValueChange={handleDiseaseStatusChange}
                items={[
                    { label: 'Not yet known', value: 'not yet known' },
                    { label: 'Known', value: 'known' },
                ]}
                placeholder={{ label: 'Select disease status', value: null }}
                />
            </View>
            {diseaseStatus === 'known' && (
                <View style={styles.knownDiseaseForm}>
                    <Text style={styles.infoText}>Please provide details below for the diagnosed disease:</Text>
                    <CustomInput
                    label="Disease"
                    placeholder="Enter disease"
                    value={disease}
                    setValue={setDisease}
                    />
                    <CustomInput
                    label="Description"
                    placeholder="Describe the disease"
                    value={description}
                    setValue={setDescription}
                    />         
                   <CustomInput
                    label="Reason"
                    placeholder="Enter the reason"
                    value={reason}
                    setValue={setReason}
                    />
                    <CustomInput
                    label="Solution"
                    placeholder="Enter the solution"
                    value={solution}
                    setValue={setSolution}
                    />
                    <Text style={styles.infoText}>Include any additional notes if needed</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Additional notes (optional)"
                        value={additionalNotes}
                        onChangeText={setAdditionalNotes}
                        multiline = {true}
                        numberOfLines = {4}    
                    />       
                </View>
            )}
            {diseaseStatus === 'not yet known' && (
                <View style={styles.additionalForm}>
                    <Text style={styles.infoText}>Lab Testing Required</Text>
                    <TextInput
                    style={styles.textArea}
                    placeholder="Enter required lab tests"
                    value={labTests}
                    multiline = {true}
                    numberOfLines = {4}
                    onChangeText={setLabTests}
                    />                 
                    <View style={styles.selectItem}>
                        <RNPickerSelect
                        onValueChange={handleDiseaseStatusChange}
                        items={[
                            { label: 'Low', value: 'Low' },
                            { label: 'Medium', value: 'Medium' },
                            { label: 'High', value: 'High' },
                        ]}
                        placeholder={{ label: 'Select urgency level', value: null }}
                        />
                    </View>
                </View>
            )}
        <CustomButton title="Submit" onPress={handleSubmit} />
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
        flexGrow: 1,
        padding: 20,
      },    
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
        textAlign: 'center',
        margin: 25
    },
    selectBox: {
        borderRadius: 5,
        borderWidth: 0.5,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        height: 50,
      },
      selectItem: {
        borderRadius: 5,
        borderWidth: 0.5,
        paddingHorizontal: 10,
        height: 50,
      },    
    textInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginVertical: 10,
    },
    textArea:{
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginVertical: 10,
        textAlignVertical: "top"
    },
    knownDiseaseForm: {
        marginTop: 10,
        padding: 20,
    
    },
    additionalForm: {
        marginTop: 20,
        padding: 20,
    },
    infoText:{
        marginVertical: 5,
        
    }
});


