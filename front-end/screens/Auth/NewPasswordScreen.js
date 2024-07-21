import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import Colors from '../../constants/Colors'
import axios from "axios";

const NewPasswordScreen = React.forwardRef((props, ref) => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [emailState, setEmailState] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordState, setPasswordState] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const [passwordRepeatState, setPasswordRepeatState] = React.useState("");


  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    state: {
      email,
      password,
      passwordRepeat,
    },

  }));

  const verifyLength = (value, length) => {
    return value.length >= length;
  };

  const isValidated = () => {
    const isEmailValid = verifyLength(email, 1);
    const isPasswordValid = verifyLength(password, 1);
    const isPasswordRepeatValid = verifyLength(passwordRepeat, 1);
    
    setEmailState(isEmailValid ? "green" : "red");
    setPasswordState(isPasswordValid ? "green" : "red");
    setPasswordRepeatState(isPasswordRepeatValid ? "green" : "red");
    
    return  isEmailValid && isPasswordValid && isPasswordRepeatValid ;
  };
  const handleSubmit = async () => {
    if (!isValidated()) return;
    try {
      await submitForm();
    } catch (error) {
      console.log('Passwd Reset failed', error);
    } 
  }

  const submitForm = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3001/auth/pwdReset', {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Data posted successfully:', response.data);
      navigation.navigate("Home");
    } catch (error) {
      if (error.response) {
        console.error('Backend error:', error.response.data);
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
            <Text style={styles.title}>New Password</Text>
            <Text style={styles.TextStyle}>Your new password must be different from previously used passwords.</Text>
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
                 <Text style={styles.label}>Confirm Password</Text>
                <CustomInput
                placeholder="Confirm Password"
                value={passwordRepeat}
                setValue={setPasswordRepeat}
                borderColor={passwordRepeatState}
                />
                <CustomButton
                title="Sign In"
                onPress={() => {
                    if (!isValidated()) {
                    alert("Please fill out all fields before proceeding.");
                    } else {
                    handleSubmit()
                    }
                }}
                />
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
  label: {
    marginBottom: 5,
  },
  inputGroup:{
    marginTop: 40,
    width: '100%',
},

});

export default NewPasswordScreen;
