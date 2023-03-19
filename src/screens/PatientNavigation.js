import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PatientHome from './patient/others/PatientHome';
import Icon from 'react-native-vector-icons/AntDesign';
import List from 'react-native-vector-icons/Entypo';
import COLORS from '../assets/common/Common';
import PatientBookingCheck from './patient/others/PatientBookingCheck';
import DoctorList from './patient/others/DoctorList';
import NetChecking from './NetChecking';
import NotApproved from './patient/others/NotApproved';
const Tab = createBottomTabNavigator();

const PatientNavigation = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <>
      {isConnected ? (
        <Tab.Navigator
          screenOptions={{headerShown: false, tabBarShowLabel: false}}>
          <Tab.Screen
            name="PatientHome"
            component={PatientHome}
            options={{
              tabBarIcon: tabInfo => {
                return tabInfo.focused ? (
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: COLORS.white,
                      borderColor: COLORS.primary,
                      borderWidth: 2,
                      borderRadius: 30,
                      top: -25,
                      elevation: 5,
                    }}>
                    <Icon name="home" color={COLORS.primary} size={28} />
                  </View>
                ) : (
                  <Icon name="home" size={28} color={COLORS.primary} />
                );
              },
            }}
          />
          <Tab.Screen
            name="DoctorList"
            component={DoctorList}
            options={{
              tabBarIcon: tabInfo => {
                return tabInfo.focused ? (
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: COLORS.white,
                      borderColor: COLORS.primary,
                      borderWidth: 2,
                      borderRadius: 30,
                      top: -25,
                      elevation: 5,
                    }}>
                    <List name="list" color={COLORS.primary} size={28} />
                  </View>
                ) : (
                  <List name="list" size={28} color={COLORS.primary} />
                );
              },
            }}
          />
          <Tab.Screen
            name="PatientNotApproved"
            component={NotApproved}
            options={{
              tabBarIcon: tabInfo => {
                return tabInfo.focused ? (
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: COLORS.white,
                      borderColor: COLORS.primary,
                      borderWidth: 2,
                      borderRadius: 30,
                      top: -25,
                      elevation: 5,
                    }}>
                    <List name="cross" color={COLORS.primary} size={28} />
                  </View>
                ) : (
                  <List name="cross" size={28} color={COLORS.primary} />
                );
              },
            }}
          />
          <Tab.Screen
            name="PatientBookingCheck"
            component={PatientBookingCheck}
            options={{
              tabBarIcon: tabInfo => {
                return tabInfo.focused ? (
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: COLORS.white,
                      borderColor: COLORS.primary,
                      borderWidth: 2,
                      borderRadius: 30,
                      top: -25,
                      elevation: 5,
                    }}>
                    <Icon name="check" color={COLORS.primary} size={28} />
                  </View>
                ) : (
                  <Icon name="check" size={28} color={COLORS.primary} />
                );
              },
            }}
          />
        </Tab.Navigator>
      ) : null}
      <NetChecking isConnected={isConnected} setIsConnected={setIsConnected} />
    </>
  );
};

export default PatientNavigation;

const styles = StyleSheet.create({});
{
  /* <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
                borderWidth: 2,
                borderRadius: 30,
                top: -25,
                elevation: 5,
              }}>
              <Icon name="search" color={COLORS.primary} size={28} />
            </View> */
}
