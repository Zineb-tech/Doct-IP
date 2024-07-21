import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { CheckBox } from 'react-native-elements'; 
import Colors from '../../constants/Colors';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton"; 
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/core";

const SignUp = React.forwardRef(() => {
  const route = useRoute();
  const { role } = route.params;

  const [username, setUsername] = React.useState("");
  const [usernameState, setUsernameState] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailState, setEmailState] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordState, setPasswordState] = React.useState("");
  const [speciality, setSpeciality] = React.useState("");
  const [specialityState, setSpecialityState] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [phoneNumberState, setPhoneNumberState] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [locationState, setLocationState] = React.useState("");
  const [isSelected, setSelection] = React.useState(false); 

  const navigation = useNavigation();

  const verifyLength = (value, length) => {
    return value.length >= length;
  };

  const isValidated = () => {
    const isUsernameValid = verifyLength(username, 1);
    const isEmailValid = verifyLength(email, 1);
    const isPasswordValid = verifyLength(password, 1);
    const isSpecialityValid = verifyLength(password, 1);
    const isPhoneNumberValid = verifyLength(password, 1);
    const isLocationValid = verifyLength(password, 1);

    

    setUsernameState(isUsernameValid ? "green" : "red");
    setEmailState(isEmailValid ? "green" : "red");
    setPhoneNumberState(isPhoneNumberValid ? "green" : "red");
    setSpecialityState(isSpecialityValid ? "green" : "red");
    setLocationState(isLocationValid ? "green" : "red")

    return isUsernameValid && isEmailValid && isPasswordValid &&  isPhoneNumberValid && isSpecialityValid && isLocationValid ;
  };
  
  const handleSubmit = async () => {
    try {
      if (!isValidated()) return;
  
      const data = {
        username: username,
        email: email,
        password: password,
        role: role,
        speciality: speciality,
        phoneNumber: phoneNumber,
        location: location
      };
  
      console.log("Submitting form with data:", data);
  
      const response = await axios.post(
        "http://10.0.2.2:3001/auth/signUp",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); 
      if (role === "Doctor") {
        navigation.navigate("BottomTabs");
      } else if (role === "Patient") {
        navigation.navigate("PatientBottomTabs");
      } 
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.TextStyle}>Fill your information below or register with your social account</Text>
          <View style={styles.inputGroup}>
            <CustomInput
              label="Username"
              placeholder="John Doe"
              value={username}
              setValue={setUsername}
              borderColor={usernameState}
            />
            <CustomInput
              label="Email"
              placeholder="example@gmail.com"
              value={email}
              setValue={setEmail}
              borderColor={emailState}
            />
            <CustomInput
              label="Password"
              placeholder="Password"
              value={password}
              setValue={setPassword}
              borderColor={passwordState}
              secureTextEntry
            />
            {role === "Doctor" && (
                <>
                <CustomInput
                label="phoneNumber"
                placeholder="phoneNumber"
                value={phoneNumber}
                setValue={setPhoneNumber}
                borderColor={phoneNumberState}
                secureTextEntry />
                <CustomInput
                  label="speciality"
                  placeholder="speciality"
                  value={speciality}
                  setValue={setSpeciality}
                  borderColor={specialityState}
                  secureTextEntry />
                <CustomInput
                  label="location"
                  placeholder="location"
                  value={location}
                  setValue={setLocation}
                  borderColor={locationState}
                  secureTextEntry />   
                </>
            )}          
            <View style={styles.checkboxContainer}>
              <CheckBox
                title="Agree with terms and condition"
                checked={isSelected}
                onPress={() => setSelection(!isSelected)}
                containerStyle={styles.checkbox} 
              />
            </View>
            <CustomButton
              onPress={handleSubmit}
              title="Register"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

// Styles
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    width: '100%',
  },
  safeArea:{
    flex:1,
    backgroundColor:Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    marginTop: 50,
    textAlign: "center",
    color: Colors.titleColor,
  },
  TextStyle:{
    marginTop: 10,
    textAlign: "center",
  },
  inputGroup:{
    marginTop: 50,
    width: '100%',
  },
  checkboxContainer:{
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox:{
    backgroundColor: 'transparent', 
    borderColor: 'transparent', 
    marginLeft: 0, 
  },
});

export default SignUp;
