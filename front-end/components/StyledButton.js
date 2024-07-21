import React from 'react'
import { Text,StyleSheet,  View, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
export default function StyledButton(props) {
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

const styles = StyleSheet.create({
    Container:{
        alignItems: 'center',

    },
    
    Btn:{
        width:310,
        height:30,
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center",
        marginTop:20,
        backgroundColor:Colors.primary
        
      },
    BtnTxt: {
        fontSize : 16,
        color:Colors.white

      }
  });