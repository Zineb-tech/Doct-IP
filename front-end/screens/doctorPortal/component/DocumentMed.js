import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity , SafeAreaView} from 'react-native';
import Colors from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function DocumentMed() {

  const navigation = useNavigation(); 

  return (
   <SafeAreaView style={styles.safeArea}>
     <View style={styles.root}>   
        <View style={styles.card}>
        <View style={styles.card}>
            <TouchableOpacity>
                <View style={styles.cardBody}>
                    <Icon name="flask" style={styles.customIcon}  />
                    <Text style={styles.cardTitle}>Pharmacy prescription</Text>
                </View>
            </TouchableOpacity>      
        </View> 
            <View style={styles.cardBody}>
                <Icon name="magnet" style={styles.customIcon}/>
                <Text style={styles.cardTitle}>Imaging prescription</Text>
            </View>
        </View>

    </View>
   </SafeAreaView>
   
)}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  root: {
    padding: 5,
    width: '100%',   
  },
    title:{
      color:Colors.titleColor,
      fontSize:14,
      fontWeight: 'bold',
      margin: 15,
    },
    subTitle:{
      fontSize:13,
      margin: 15,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ddd',
      marginHorizontal: 15,
      marginTop:35,  
      width:150,
      height:150,
    },
    cardBody: {
      padding: 20,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
      textAlign: "center",

    },
    img:{
      height:100,
      width:"50%"
    },
    Selection:{
      flexDirection:'row',
      justifyContent: 'space-between'
    },
    customIcon:{
     fontSize:  25,
     color:Colors.titleColor,
     marginHorizontal: 40,
    },
  });