import React, { useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet, View, Image } from 'react-native';
import StyledButton from '../../../components/StyledButton';
import Colors from '../../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('No token found in AsyncStorage');
          return;
        }
        
        console.log('Token retrieved:', token); 
  
        const response = await axios.get('http://10.0.2.2:3001/auth/doctors', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDoctors(response.data);
      } catch (error) {
        console.error('Failed to fetch doctors', error);
      }
    };

    fetchDoctors();
  }, []);

  const navigation = useNavigation(); 

  const handleBookAppointment = (userId) => {
    console.log('Doctor ID:', userId);

    navigation.navigate('PainMap', { userId });
  };
  
  const renderItem = ({ item }) => (
    
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Image source={item.image} style={styles.image} />
        <View>
          <Text style={styles.speciality}>{item.speciality}</Text>
          <Text style={styles.title}>Dr. {item.username}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Icon name="phone" size={20} color={Colors.primary} />
              <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="map-marker" size={20} color={Colors.primary} />
              <Text>{item.location}</Text>
            </View>
          </View>
        </View>
      </View>
      <StyledButton title="Book Now" onPress={() => handleBookAppointment(item.userId)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Top Doctors For You</Text>
      <FlatList
        style={styles.list}
        data={doctors}
        renderItem={renderItem}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} 
      />
    </View> 
  );
};

export default DoctorsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, 
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.titleColor
  },
  phoneNumber: {
    fontSize: 15,
    color: Colors.black,
    marginLeft: 10
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 10, 
    marginBottom: 10, 
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    backgroundColor: Colors.primary
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  speciality:{
    fontSize: 12,
  },
});
