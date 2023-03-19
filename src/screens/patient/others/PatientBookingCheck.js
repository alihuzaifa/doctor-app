import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CrossIcon from 'react-native-vector-icons/Entypo';
import COLORS from '../../../assets/common/Common';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetChecking from '../../NetChecking';

const PatientBookingCheck = ({navigation}) => {
  const [notApprovedData, setNotApprovedData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const getAppointments = async () => {
    try {
      const value = await AsyncStorage.getItem('data');
      const patient = JSON.parse(value);
      const getAppointments = await axios.get(
        `http://drapp.somee.com/SelectNAAppointmentByPatientId?patientId=${patient?.id}`,
      );
      if (getAppointments?.data?.Data !== null) {
        const updateWithImage = getAppointments?.data?.Data.map(item => {
          return {
            ...item,
            image: require('../../../assets/images/patient/1.png'),
          };
        });
        setNotApprovedData(updateWithImage);
      }
    } catch (error) {
      alert(error);
    }
  };

  const ApprovedAppointments = async () => {
    try {
      const value = await AsyncStorage.getItem('data');
      const patient = JSON.parse(value);
      const getAppointments = await axios.get(
        `http://drapp.somee.com/SelectApprovedAppointmentByPatientId?patientId=${patient?.id}`,
      );
      console.log('getAppointments', getAppointments?.data);
      if (getAppointments?.data?.Data !== null) {
        const updateWithImage = getAppointments?.data?.Data.map(item => {
          return {
            ...item,
            image: require('../../../assets/images/patient/1.png'),
          };
        });
        setApprovedData(updateWithImage);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAppointments();
    ApprovedAppointments();
  }, []);

  const CartCard = ({item}) => {
    return (
      <>
        <View style={style.cartCard}>
          <Image source={item?.image} style={{height: 80, width: 80}} />
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 20,
              flex: 1,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              {item?.drName}
            </Text>
            <Text style={{fontSize: 13, color: COLORS.grey}}>
              {item?.expertInDisease}
            </Text>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              {new Date().toDateString()}
            </Text>
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      {isConnected ? (
        <>
          <View style={{backgroundColor: COLORS.white, elevation: 5}}>
            <View style={style.header}>
              <Icon
                name="arrow-back-ios"
                color={COLORS.primary}
                size={28}
                onPress={navigation.goBack}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}>
                Confirm Appointments
              </Text>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 80}}
              data={approvedData}
              renderItem={({item}) => <CartCard item={item} />}
            />
          </View>
        </>
      ) : null}
      <NetChecking isConnected={isConnected} setIsConnected={setIsConnected} />
    </SafeAreaView>
  );
};

export default PatientBookingCheck;

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
