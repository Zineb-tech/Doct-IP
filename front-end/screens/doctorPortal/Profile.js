import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import CustomInput from "../../components/CustomInput";
import { SelectList } from 'react-native-dropdown-select-list'

export default function Profile() {

  const [userData, setUserData] = useState("");
  const [email, setEmail] = useState(userData ? userData.email : '');
  const [speciality, setSpeciality] = useState(userData ? userData.speciality : '');
  const [phoneNumber, setPhoneNumber] = useState(userData ? userData.phoneNumber : '');
  const [image, setImage] = useState(null);
  const [selected, setSelected] = React.useState("");

  const data = [
    { key: '1', value: 'General Practice' },
    { key: '2', value: 'Pediatrics' },
    { key: '4', value: 'Dermatology' },
    { key: '11', value: 'Endocrinology' },
    { key: '12', value: 'Gastroenterology' },
    { key: '13', value: 'Pulmonology' },
    { key: '14', value: 'Nephrology' },
    { key: '16', value: 'Hematology' },
    { key: '17', value: 'Allergy & Immunology' },
    { key: '24', value: 'Genetics and Genomics' },
    { key: '25', value: 'Hospice and Palliative Medicine' },
    { key: '27', value: 'Internal Medicine' },
    { key: '28', value: 'Neurology' },
    { key: '36', value: 'Physical Medicine and Rehabilitation' },
    { key: '38', value: 'Preventive Medicine' },
    { key: '39', value: 'Psychiatry' },
    { key: '41', value: 'Rheumatology' },
    { key: '42', value: 'Sleep Medicine' },
    { key: '44', value: 'Urology' },
  ];
  
 


 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token); 
        const response = await axios.get(
          'http://10.0.2.2:3001/auth/userdetails/{id}',
          {
            headers: {
              Authorization: 'Bearer ' + token, 
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData(); 
  }, []);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Image
        style={[styles.imgStatusBar, { transform: [{ scaleY: -1 }] }]}
        source={require('../../assets/images/top-view-health-still-life-with-copy-space.jpg')}/>
        <View style={styles.root}> 
          <View style={styles.container}>
            <TouchableOpacity>
              <Image style={styles.avatar} source={image ? { uri: image } : require('../../assets/images/user.png')} />
              <Icon  style={styles.icon} name="camera" size={16} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>{userData.username}</Text>
          </View>
          <View style={styles.formHeader}>
            <Text style={styles.subTitle}>Personal info</Text>
            <TouchableOpacity >
              <Text style={styles.editTextStyle}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.infoText}>speciality</Text>
            <SelectList 
              setSelected={(val) => setSelected(val)} 
              data={data} 
              save="value"
              boxStyles={styles.selectBox}
              dropdownStyles={styles.dropdownList} 
              dropdownTextStyles	={styles.selectedItem}  
              placeholder="select your speciality" 
            /> 
            <Text style={styles.infoText}>Email Address</Text>
            <CustomInput
              label="Email"
              placeholder="example@gmail.com" 
              value={userData && userData.email ? userData.email : email}
              setValue={setEmail}                         
            />
            <Text style={styles.infoText}>Phone Number</Text>
            <CustomInput
              label="phoneNumber"
              placeholder=" Enter Phone Number"  
            />                      
            <Text style={styles.infoText}>Graduated From</Text>           
            <CustomInput
              label="University"
              placeholder="Enter your university name"                
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
   
  )
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  root: {
    padding: 40,
    width:'100%',
  },
  imgStatusBar:{
   height:120,
   width:"100%",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 70,
    backgroundColor: Colors.black,
    marginTop: -90, 
  },
  container:{
    alignItems: 'center', 
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:25,
    color:Colors.titleColor,
  },
  icon:{
    marginLeft:105,
    marginTop: -35, 
  },
  subTitle:{
    fontSize: 16,
    color:Colors.primary
  
  },
  inputGroup:{
    marginTop:10,
    borderTopColor:Colors.pastel,
    borderTopWidth:1.5,
  },
 
  infoText:{
    marginTop:15,  
  },
  formHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:25,
  },
  editTextStyle:{
    color:Colors.titleColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectBox:{
    borderRadius: 5,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginVertical: 5,
    height:50,
  },
  dropdownList: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
  },   
});
