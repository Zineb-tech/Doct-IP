import React from 'react'
import { Image, StyleSheet,SafeAreaView, TouchableOpacity, View, Text } from 'react-native'
import CustomButton from '../components/CustomButton.js'
import Colors from '../constants/Colors'

export default function Welcome({navigation}) {
  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUpPress = () => {
    navigation.navigate('Identity');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.root}>
    <Text style={styles.title}>Welcome to DOC'TIP</Text>
      <Image 
        source={require("../assets/images/Online Doctor-rafiki.png")} 
        style={styles.imageStyle}/>
      <Text style={styles.TextStyle}>Your Ultimate  Doctor  Office App</Text>
      <CustomButton 
          title="Let's Get Started!" 
          onPress={handleSignUpPress}/> 
        <TouchableOpacity onPress={handleSignInPress}>
          <Text style={styles.BottomText}>Already have an account? <Text style={styles.Underline}>Sign In</Text></Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
    imageStyle: {
        width: 400, 
        height: 400,
    },
    safeArea:{
        flex:1,
        backgroundColor:Colors.white,

    },
    TextStyle:{
    fontWeight: 'bold',
    fontSize : 20,
    textAlign: "center",
    marginVertical: 4,

    },
    title:{
        marginTop: 50,
        fontWeight: 'bold',
        fontSize : 20,
        textAlign: "center",
        color: Colors.titleColor,

    },
    BottomText:{
        marginTop:40,
        textAlign: "center",

    },
    Underline: {
      textDecorationLine: 'underline',
    },
   
  });
  