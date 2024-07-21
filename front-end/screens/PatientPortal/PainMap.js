import { StyleSheet, Switch, Text, View,  TextInput, ScrollView, TouchableOpacity, Button } from "react-native";
import { useState, useEffect } from "react";
import Body from "react-native-body-highlighter";
import Slider from "@react-native-community/slider";
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../../constants/Colors";
import StyledButton from "../../components/StyledButton";
import { useNavigation, useRoute} from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PainMap() {
  const [bodyPartsSelected, setBodyPartsSelected] = useState([]);
  const [isBackSideEnabled, setIsBackSideEnabled] = useState(false);
  const [isMale, setIsMale] = useState(true);
  const [value, setValue] = useState("");
  const [patientUsername, setPatientUsername] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [patientId, setPatientId] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;


  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('No token found in AsyncStorage');
          return;
        }
        const response = await axios.get(
          'http://10.0.2.2:3001/auth/userdetails/{id}',
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        console.log('API response:', response.data); 
        setPatientUsername(response.data.username);
        setPatientId(response.data.userId);
        } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData();
    }, []);

  const onChangeText = (text) => {
    setValue(text);
  };

  const toggleGenderSwitch = () => setIsMale((previousState) => !previousState);

  const handleBodyPartPress = (e) => {
    setBodyPartsSelected((prevSelected) => {
      const alreadySelected = prevSelected.find((part) => part.slug === e.slug);
      if (alreadySelected) {
        return prevSelected.filter((part) => part.slug !== e.slug);
      } else {
        return [...prevSelected, { slug: e.slug, intensity: 2, symptoms: [], description: "" }];
      }
    });
  };

  const handleIntensityChange = (part, intensity) => {
    console.log(`Changing intensity for part: ${part.slug} to ${intensity}`);
    setBodyPartsSelected((prevSelected) => {
      const updatedParts = prevSelected.map((selectedPart) =>
        selectedPart.slug === part.slug ? { ...selectedPart, intensity: intensity } : selectedPart
      );
      console.log('Updated parts:', updatedParts);
      return updatedParts;
    });
  };

  const handleSymptomChange = (partSlug, symptomType, isChecked) => {
    setBodyPartsSelected((prevSelected) =>
      prevSelected.map((part) =>
        part.slug === partSlug
          ? {
              ...part,
              symptoms: isChecked
                ? [...part.symptoms, symptomType]
                : part.symptoms.filter((symptom) => symptom !== symptomType),
            }
          : part
      )
    );
  };

  const isValidated = () => {
    if (bodyPartsSelected.length === 0) {
      console.error("No body parts selected.");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    try {
      if (!isValidated()) return;
  
      const bodyPartsData = {};
      bodyPartsSelected.forEach(part => {
        bodyPartsData[part.slug] = {
          intensity: part.intensity,
          symptoms: part.symptoms,
          description: part.description,

        };
      });
  
      const data = {
        bodyParts: bodyPartsData,
        patientId: patientId


      };
  
      console.log("Submitting form with data:", data);

      const response = await axios.post(
        "http://10.0.2.2:3001/symptom/Symptom",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Response:", response.data);
      const symptomId = response.data.symptomId;
      setSymptoms(bodyPartsSelected); 
      if (symptoms) {
        navigation.navigate('Booking', { symptoms: bodyPartsSelected, userId, symptomId });
      } else {
        alert('Please enter your symptoms.');
      }
  
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add your symptoms</Text>    
      <View style={styles.bodySelection}>
        <Body
          data={bodyPartsSelected}
          onBodyPartPress={handleBodyPartPress}
          gender={isMale ? "male" : "female"}
          side={isBackSideEnabled ? "back" : "front"}
          scale={0.5}
          style={styles.body}
        />
        <View style={styles.asideItems}>
          <TouchableOpacity onPress={() => setIsBackSideEnabled((prevState) => !prevState)}>
            <View style={styles.customPart}>
              <Text>Rotate Model</Text>
              <Icon style={styles.icon} name="repeat" />
            </View>
          </TouchableOpacity>
          <View style={styles.switch}>
            <Text>Gender ({isMale ? "Male" : "Female"})</Text>
            <Switch style={styles.icon} onValueChange={toggleGenderSwitch} value={isMale} />
          </View>
        </View>
      </View>
      <View style={styles.symptomComponent}>
        <TextInput
          style={styles.textInputSymptom}
          placeholder="Add Symptom..."
          onChangeText={onChangeText}
          value={value}
        />
        <TouchableOpacity onPress={() => setBodyPartsSelected((prevSelected) => [
          ...prevSelected,
          { slug: value, intensity: 2, symptoms: [], details: "" }
        ])}>
          <Icon style={styles.addIcon} name="plus" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.selectedPartsContainer}>
        {bodyPartsSelected.map((part) => (
          <View key={part.slug} style={styles.partDetails}>
            <Text style={styles.partTitle}>{part.slug}</Text>
            <Text>Intensity: {part.intensity}</Text>
            <Text>{patientUsername}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={part.intensity}
              onValueChange={(value) => handleIntensityChange(part, value)}
            />
            <Text>Symptoms:</Text>
            <CheckBox
              title="Pain"
              checked={part.symptoms.includes("Pain")}
              onPress={() => handleSymptomChange(part.slug, "Pain", !part.symptoms.includes("Pain"))}
            />
            <CheckBox
              title="Numbness"
              checked={part.symptoms.includes("Numbness")}
              onPress={() => handleSymptomChange(part.slug, "Numbness", !part.symptoms.includes("Numbness"))}
            />
            <CheckBox
              title="Tingling"
              checked={part.symptoms.includes("Tingling")}
              onPress={() => handleSymptomChange(part.slug, "Tingling", !part.symptoms.includes("Tingling"))}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Describe the symptom"
              value={part.description} 
              onChangeText={(text) => setBodyPartsSelected((prevSelected) =>
                prevSelected.map((p) =>
                  p.slug === part.slug ? { ...p, description: text } : p
                )
              )}
            />
          </View>
        ))}
      </ScrollView>
      <StyledButton title="Next" onPress={handleSubmit} />
     
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
  symptomComponent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  textInputSymptom: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  addIcon: {
    backgroundColor: Colors.primary,
    color: 'white',
    padding: 10,
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 15,
  },
  bodySelection: {
    flexDirection: "row",
    marginBottom: 5,
  },
  asideItems: {
    flexDirection: "column",
    justifyContent: "center",
    marginStart: 40
  },
  customPart: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    marginLeft: 10,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedPartsContainer: {
    flex: 1,
  },
  partDetails: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  partTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  textInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginVertical: 10,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
