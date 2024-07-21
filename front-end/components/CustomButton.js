import React from 'react'
import { Text,StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
export default function Button(props) {
  return (
    <View style={styles.Container}>
        <TouchableOpacity
          style={styles.Btn}
          onPress={props.onPress}
        >
        <Text style={styles.BtnTxt}>{props.title}</Text>
        </TouchableOpacity>
    </View>
    
  )
}
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    Container:{
        alignItems: 'center',

    },
    
    Btn:{
        width: screenWidth * 0.7,
        height:50,
        borderRadius:25,
        justifyContent:"center",
        alignItems:"center",
        marginTop:20,
        backgroundColor:Colors.primary
      },
    BtnTxt: {
        fontSize : 20,
        color:Colors.white

      }
  });