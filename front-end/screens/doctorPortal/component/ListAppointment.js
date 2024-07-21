import { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet, View, Image} from 'react-native';
import StyledButton from '../../../components/StyledButton';
import Colors from '../../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation} from "@react-navigation/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";




const ListAppointment = () => {
 
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorId, setDoctorId] = useState([]);


  const navigation = useNavigation(); 
  useEffect(() => {
    const fetchDoctorId = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('No token found in AsyncStorage');
          return;
        }
        const response = await axios.get(
          'http://10.0.2.2:3001/auth/userdetails/{id}',
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        console.log('API response:', response.data); 
        setDoctorId(response.data.userId);
        } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchDoctorId();
    }, []);

    useEffect(() => {
      const fetchAppointments = async () => {
        if (!doctorId) return;
  
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            console.log('No token found in AsyncStorage');
            return;
          }
  
          const response = await axios.get(
            `http://10.0.2.2:3001/booking/appointment/${doctorId}`,
            {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }
          );
          const today = new Date().toISOString().split('T')[0];
          const todayAppointments = response.data.filter(
            (appointment) => appointment.date.split('T')[0] === today
          );
          setAppointments(todayAppointments);
          console.log('Appointments:', todayAppointments);
          setLoading(false);
        } catch (error) {
          console.log('Error fetching appointments:', error);
          setLoading(false);
        }
      };
  
      fetchAppointments();
    }, [doctorId]);
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    const handleButtonPress = (bookingId) => {
      console.log('Booking ID:', bookingId);
      navigation.navigate("CheckSymptoms", { bookingId });
    };
    
  

    const renderItem = ({ item }) => {
      const date = new Date(item.date);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const time = `${hours}:${minutes}`;
          return (
        <View style={styles.itemContainer}>
          <View style={styles.itemContent}>
            <Image source={item.image} style={styles.image} />
            <View>
              <Text style={styles.title}>{item.username}</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Icon name="phone" size={20} color={Colors.primary} />
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.timeSlot}>{time}</Text>
                </View>
              </View>
            </View>
          </View>
          <StyledButton title="View Patient Details" onPress={() => handleButtonPress(item._id)} />
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Today's Appointments</Text>
        <FlatList
          style={styles.list}
          data={appointments}
          renderItem={renderItem}
          keyExtractor={item =>item._id}
        />
      </View>
    );
  };
  
  

export default ListAppointment;

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
    marginLeft:10
  },
  timeSlot: {
    fontSize: 15,
    fontWeight: ' bold',
    color: Colors.titleColor,
    marginLeft:155
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
  }
});
