import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import Colors from '../../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomButton from '../../../components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TimerPicker } from 'react-native-timer-picker';
//import { FlatList } from 'react-native-gesture-handler';

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [showSelectedDateTime, setShowSelectedDateTime] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showBookingButton, setShowBookingButton] = useState(false);
  const [patientUsername, setPatientUsername] = useState('');
  const [patientId, setPatientId] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const symptoms = route.params?.symptoms || [];
  const { userId } = route.params;
  const { symptomId } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('No token found in AsyncStorage');
          return;
        }
        const response = await axios.get('http://10.0.2.2:3001/auth/userdetails/{id}', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        console.log('API response:', response.data);
        setPatientUsername(response.data.username);
        setPatientId(response.data.userId);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleCancel = () => {
    setSelectedDate(null);
    setSelectedTime('');
    setShowSelectedDateTime(false);
    setShowCancelButton(false);
    setShowBookingButton(false);
  };

  const handleAppBooking = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.log('No token found in AsyncStorage');
      return;
    }

    const time = selectedTime || '00:00';
    const dateTimeString = `${selectedDate}T${time}`;

    const bookingData = {
      date: dateTimeString,
      username: patientUsername,
      doctorId: userId,
      patientId: patientId,
      symptomId: symptomId
    };

    try {
      const response = await axios.post('http://10.0.2.2:3001/booking/booking', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      navigation.navigate('SympAndBookingEntry', { symptoms, bookingData });
    } catch (error) {
      console.error('Error making booking:', error);
    }
  };

  const handleDurationChange = ({ hours, minutes }) => {
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    setSelectedTime(formattedTime);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>
      <Card containerStyle={styles.card}>
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            setShowSelectedDateTime(true);
            setShowCancelButton(true);
            setShowBookingButton(true);
          }}
          markedDates={{
            [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
          }}
        />
      </Card>
      {showSelectedDateTime && (
        <View containerStyle={styles.card}>
          <Text style={styles.subtitle}>Select Time</Text>
          <TimerPicker
            onDurationChange={handleDurationChange}
            padWithNItems={0}
            hideSeconds
            hourLabel=""
            minuteLabel=""
            styles={{
              theme: 'white',
              pickerItem: {
                fontSize: 34,
              },
              pickerLabel: {
                fontSize: 32,
                marginTop: 0,
              },
              pickerContainer: {
                marginLeft: 140,
                marginRight: 140,
              },
              pickerItemContainer: {
                width: 50,
              },
              pickerLabelContainer: {
                right: -10,
                top: 0,
                bottom: 6,
                alignItems: 'center',
              },
            }}
          />
        </View>
      )}
      <View>
        {showCancelButton && <CustomButton title="Cancel" onPress={handleCancel} />}
        {showBookingButton && <CustomButton title="Book Appointment" onPress={handleAppBooking} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: Colors.titleColor,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.titleColor,
    textAlign: 'center',
  },
});
