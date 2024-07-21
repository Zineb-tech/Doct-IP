import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import CustomInput from '../../../components/CustomInput';
import Colors from '../../../constants/Colors';
import { SelectList } from 'react-native-dropdown-select-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

export default function AddTreatment() {
  const [medicine, setMedicine] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [intervalType, setIntervalType] = useState(null);
  const [intervalCount, setIntervalCount] = useState("");
  const [duration, setDuration] = useState("");
  const [quantity, setQuantity] = useState("");
  const [frequency, setFrequency] = useState("");
  const [treatments, setTreatments] = useState([]);

  const navigation = useNavigation();

  const data = [
    { key: '1', value: 'Tablets' },
    { key: '2', value: 'ml' },
    { key: '4', value: 'gr' },
    { key: '11', value: 'mg' },
    { key: '12', value: 'Drops' },
  ];

  const dataProgram = [
    { key: '1', value: 'Every Day' },
    { key: '2', value: 'Interval Days' },
  ];

  const intervalTypes = [
    { key: '1', value: 'Days' },
    { key: '2', value: 'Weeks' },
    { key: '3', value: 'Months' },
  ];

  const getIntervalText = () => {
    if (!intervalType || !intervalCount) return '';
    const typeText = intervalTypes.find(item => item.key === intervalType)?.value.toLowerCase();
    return `Every ${intervalCount} ${typeText}`;
  };

  const handleSubmission = () => {
    const selectedProgramText = dataProgram.find(item => item.key === selectedProgram)?.value || '';
    const selectedUnitText = data.find(item => item.key === selectedUnit)?.value || '';

    const newTreatment = {
      medicine,
      selectedProgram: selectedProgramText,
      selectedUnit: selectedUnitText,
      intervalType,
      intervalCount,
      duration,
      quantity,
      frequency
    };
    setTreatments([...treatments, newTreatment]);
    navigation.navigate('TreatmentList', { treatments: [...treatments, newTreatment] });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <Text style={styles.sectionHeader}>Medication</Text>
        <CustomInput
          label="Medicine"
          placeholder="Enter the medicine"
          value={medicine}
          setValue={setMedicine}
        />
        <SelectList
          setSelected={setSelectedProgram}
          data={dataProgram}
          boxStyles={styles.selectBoxProgram}
          dropdownStyles={styles.dropdownList}
          dropdownTextStyles={styles.selectedItem}
          placeholder="Select program"
        />
        {selectedProgram === '2' && (  
          <>
            <Text style={styles.infoText}>Interval Type</Text>
            <SelectList
              setSelected={setIntervalType}
              data={intervalTypes}
              boxStyles={styles.selectBox}
              dropdownStyles={styles.dropdownList}
              dropdownTextStyles={styles.selectedItem}
              placeholder="Select interval type"
            />
            <Text style={styles.infoText}>Interval Count</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter interval count"
              value={intervalCount}
              onChangeText={setIntervalCount}
              keyboardType="numeric"
            />
            <Text style={styles.intervalText}>{getIntervalText()}</Text>
          </>
        )}
        <Text style={styles.sectionHeader}>Dosage Information</Text>
        <View style={styles.item}>
          <SelectList
            setSelected={setSelectedUnit}
            data={data}
            boxStyles={styles.selectBox}
            dropdownStyles={styles.dropdownList}
            dropdownTextStyles={styles.selectedItem}
            placeholder="Select medical unit"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.sectionHeader}>Additional Information</Text>
        <View>
          <Text style={styles.infoText}>Duration</Text>
          <CustomInput
            label="Duration"
            placeholder="Enter duration (7 days, 2 weeks, 3 months)"
            value={duration}
            setValue={setDuration}
          />
          <Text style={styles.infoText}>Frequency per Day</Text>
          <CustomInput
            placeholder="Enter frequency (1-3 times per day)"
            value={frequency}
            setValue={setFrequency}
            keyboardType="numeric"
          />
        </View>
        <CustomButton title="Submit" onPress={handleSubmission} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  root: {
    padding: 40,
    width: '100%',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 20,
  },
  infoText: {
    marginTop: 15,
  },
  selectBox: {
    borderRadius: 5,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 50,
    width: 150,
  },
  selectBoxProgram: {
    borderRadius: 5,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 50,
  },
  dropdownList: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  selectedItem: {
    color: Colors.primary,
  },
  input: {
    borderRadius: 5,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 50,
    width: 150,
  },
  intervalText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.primary,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
