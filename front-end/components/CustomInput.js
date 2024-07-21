import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = ({label, value, setValue, placeholder, borderColor}) => {
  return (
    <View style={[styles.container, { borderColor }]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#e8e8e8',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    height:50,
  },
  input:{
    paddingVertical: 12,
  } 
});

export default CustomInput;
