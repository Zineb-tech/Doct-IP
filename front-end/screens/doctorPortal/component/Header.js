import React from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native';
import Colors from '../../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header() {
  return (
    <View>
      <View style={styles.header}>
        <Image style={styles.profileImage} source={require('../../../assets/images/Online Doctor-rafiki.png')} />
        <View style={styles.text}>
          <Text style={styles.title}>Welcome, Doctor</Text>
          <Text>username</Text>
        </View>
      </View>
      <View style={styles.searchBar}>
        <Icon name="search" color="black" />
        <TextInput style={styles.placeholder} placeholder="Search" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  text: {
    marginLeft: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:Colors.titleColor
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: Colors.pastel,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    margin: 20,
    height:40
  },
  placeholder: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.black,
  },
});
