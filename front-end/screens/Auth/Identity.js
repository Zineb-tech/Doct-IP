import React from 'react';
import { View, Text } from "react-native";
import CustomButton from "../../components/CustomButton"; 
import { useNavigation } from "@react-navigation/core";

export default function Identity() {
    const navigation = useNavigation();

    const handleRoleSelection = (role) => {
      console.log(`Role selected: ${role}`);
      navigation.navigate('SignUp', { role });
  };

    
  return (
    <View>
        <Text>Are you a Doctor or a Patient</Text>
        <CustomButton
        onPress={() => handleRoleSelection('Doctor')}
        title="Doctor"
        />
        <CustomButton
        onPress={() => handleRoleSelection('Patient')}
        title="Patient"
        />
    </View>
  )
}
