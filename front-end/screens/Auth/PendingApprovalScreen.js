import React from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors'

export default function PendingApprovalScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.root}>
    <Image 
        source={require("../../assets/images/approvalScreen.jpg")} 
        style={styles.imageStyle}/>
      <Text style={styles.title}>We're evaluating your profil</Text>
      <Text style={styles.textStyle}>In order to make sure our community holds up a standard, we don't allow any profils to get in.</Text>
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
        width: 250, 
        height: 250,
        borderRadius: 200, 
        marginTop: 100,

    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 255, 0.5)', 
    },
    safeArea:{
        flex:1,
        backgroundColor:Colors.white,

    },
    textStyle:{
      marginTop: 15,
      textAlign: "center",

    },
    title:{
        marginTop: 50,
        fontWeight: 'bold',
        fontSize : 20,
        textAlign: "center",
        color: Colors.titleColor,

    },
    
   
  });