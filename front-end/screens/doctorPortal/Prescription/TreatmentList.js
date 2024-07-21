import React,{useLayoutEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function TreatmentList({ route }) {
  const { treatments } = route.params;

  const renderTreatmentParagraph = (item) => {
    return `The prescribed quantity is ${item.quantity} ${item.selectedUnit}. The duration of the treatment is ${item.duration}. The intake program is ${item.selectedProgram}, and the recommended frequency is ${item.frequency} times per day.`;
  };

  const handleEdit = (item) => {
    console.log('Edit', item);
  };

  const handleDelete = (item) => {
    console.log('Delete', item);
  };

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("AddTreatment")}>
          <Icon name="plus" size={25} color={Colors.primary} style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
      <FlatList
        data={treatments}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.medicineContainer}>
              <Icon name="medkit" style={styles.customizedIcon} />
              <Text style={styles.text}>{item.medicine}</Text>             
            </View>           
            <View style={styles.verticleLine} />
            <View style={styles.paragraph}>
            <Text >{renderTreatmentParagraph(item)}</Text>
            <View style={styles.bottomRow}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Icon name="edit" style={styles.customIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <Icon name="trash" style={styles.customIcon} />
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  root: {
    padding: 5,
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 10,
    marginTop:15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
 
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  paragraph: {
    fontSize: 14,
    color: Colors.black,
    textAlign: 'justify',
    flex: 1,
  },
  verticleLine: {
    height: '100%',
    width: 2,
    backgroundColor: Colors.primary,
    marginHorizontal: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  customIcon: {
    fontSize: 25,
    color: Colors.primary,
    marginTop:15

  },
  customizedIcon: {
    fontSize: 25,
    color: Colors.primary,
    marginLeft:25,
    marginBottom:15
  },
});
