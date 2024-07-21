import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '../../../constants/Colors';
import { useNavigation,useRoute } from '@react-navigation/native';
export default function PatientInf() {
  const navigation= useNavigation()
  const route = useRoute();
  
  const { patientId } = route.params;
  const handleCheckSymptoms = (patientId) => {
    navigation.navigate("CheckSymptoms", { patientId });
  };

  return (
    
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
      <TouchableOpacity onPress={() => handleCheckSymptoms(patientId)}>
      <View style={styles.card}>
            <View style={styles.cardBody}>
              <Image
              style={styles.img}
              source={require('../../../assets/images/prescriptinimage.jpg')}/>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardFooterText}>CheckSymptoms</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("AddTreatment")}}>
          <View style={styles.card}>
            <View style={styles.cardBody}>
              <Image
              style={styles.img}
              source={require('../../../assets/images/prescriptinimage.jpg')}/>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardFooterText}>Prescribe treatment</Text>
            </View>
          </View>
        </TouchableOpacity>                      
       </View>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    width: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 5,
    marginTop:10,    
  },
  cardBody: {
    padding: 10,
  },
  cardCategory: {
    fontSize: 12,
    color: '#888',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    padding: 10,
    alignItems: 'center',
  },
  cardFooterText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  img:{
    height:130,
    width:"100%"
  },
  Selection:{
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  iconStyle:{
    margin:20,
  },
});
