import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import Colors from '../../constants/Colors'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignIn = React.forwardRef((props, ref) => {
  const navigation = useNavigation();


  const [email, setEmail] = React.useState("");
  const [emailState, setEmailState] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordState, setPasswordState] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [role, setRole] = React.useState("");


  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    state: {
      email,
      password,

    },

  }));

  const verifyLength = (value, length) => {
    return value.length >= length;
  };

  const isValidated = () => {
    const isEmailValid = verifyLength(email, 1);
    const isPasswordValid = verifyLength(password, 1);

    setEmailState(isEmailValid ? "green" : "red");
    setPasswordState(isPasswordValid ? "green" : "red");

    return  isEmailValid && isPasswordValid ;
  };
  

  const handleSubmit = async () => {
    if (!isValidated()) return;
    try {
      await submitForm();
    } catch (error) {
      console.log('Login failed', error);
    } 
  }

  const submitForm = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3001/auth/login', {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Data posted successfully:', response.data);
      await AsyncStorage.setItem('token', response.data.access_token);

      setRole(response.data.role);

      if (response.data.role === "Doctor") {
        navigation.navigate("BottomTabs");
      } else if (response.data.role === "Patient") {
        navigation.navigate("PatientBottomTabs");
      }
     } catch (error) {
      if (error.response) {
        console.error('Backend error:', error.response.data);
        setEmailState("red");
        setPasswordState("red"); 
        setErrorMessage("Incorrect email or password. Please try again.")   
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };
  

  return (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.TextStyle}>Hi! Welcome back, you've been missed</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <CustomInput
                placeholder="example@gmail.com"
                value={email}
                setValue={setEmail}
                borderColor={emailState}
                />
                <Text style={styles.label}>Password</Text>
                <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                borderColor={passwordState}
                />
                <CustomButton
                title="Sign In"
                onPress={handleSubmit}
                />                
                {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                 ) : null}
                 <TouchableOpacity onPress={()=>navigation.navigate("NewPasswordScreen")}>
                  <Text style={styles.underline}>Forgot password ?</Text>        
                </TouchableOpacity> 
            </View>
        </View>
    </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    width:'100%',
  },
  safeArea:{
    flex:1,
    backgroundColor:Colors.white,

},
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    marginTop:50,
    textAlign: "center",
    color: Colors.titleColor,
  },
  TextStyle:{
    marginTop:10,
    textAlign: "center",

    },
  inputGroup:{
      marginTop: 40,
      width: '100%',
  },
  label: {
    marginBottom: 5,
  },
  underline:{
    textDecorationLine: 'underline',
    left:200,
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },


});

export default SignIn;
