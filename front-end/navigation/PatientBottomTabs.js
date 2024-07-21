import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/doctorPortal/Profile';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Colors from '../constants/Colors';
//import PainMap from '../screens/PatientPortal/PainMap';
//import Diagnose from '../screens/doctorPortal/Diagnose';
import HomePatientScreen from '../screens/PatientPortal/HomePatientScreen.js';
//import PlanSurgery from '../screens/doctorPortal/PlanSurgery.js';
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName='HomePatientScreen'
    screenOptions={{
      activeTintColor: Colors.primary, 
      inactiveTintColor: Colors.titleColor,
      labelStyle: {
        fontSize: 12, 
        fontWeight: 'bold', 
      },
    }}
>
      <Tab.Screen name="Home" component={HomePatientScreen} 
      options={{
        headerShown: false,

        tabBarIcon: ({ color }) => (
          <Icon name="home" size={20} color={color} />
        )
      }}
      />
      <Tab.Screen name="Profile" component={Profile}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Icon name="user" size={20} color={color} />
        )
      }}/>    
    </Tab.Navigator>
  );
}




