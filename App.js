import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardScreen from './src/screens/OnBoardScreen';
import Signin from './src/screens/doctor/auth/Signin';
import Signup from './src/screens/doctor/auth/Signup';
// import PatientHome from './src/screens/PatientHome';
import DetailsScreen from './src/screens/patient/others/DetailedScreen';
import Dashboard from './src/screens/doctor/others/Dashboard';
import PatientNavigation from './src/screens/PatientNavigation';
import WelcomePage from './src/screens/WelcomePage';
import COLORS from './src/assets/common/Common';
import PatientSignin from './src/screens/patient/auth/PatientSignin';
import PatientSignup from './src/screens/patient/auth/PatientSignup';
import PatientProfile from './src/screens/patient/others/PatientProfile';
import DoctorProfile from './src/screens/doctor/others/DoctorProfile';
import Splash from './src/screens/Splash';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primary} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnBoard" component={OnBoardScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Signin} />
        <Stack.Screen name="SignInScreen" component={PatientSignin} />
        <Stack.Screen name="SignUpScreen" component={PatientSignup} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="PatientNavigator" component={PatientNavigation} />
        <Stack.Screen name="PatientProfile" component={PatientProfile} />
        <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
