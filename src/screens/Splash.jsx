import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import COLORS from '../assets/common/Common';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('data');
      const data = JSON.parse(value);
      if (data !== null) {
        if (data?.userStatus == 'Doctor') {
          navigation.navigate('Dashboard');
        } else if (data?.userStatus == 'Patient') {
          console.log('Hello');
          navigation.navigate('PatientNavigator');
        }
      } else {
        navigation.navigate('OnBoard');
      }
    } catch (error) {
      alert(error);
    }
  };
  const navigateUser = () => {
    setTimeout(() => {
      getData();
    }, 1500);
  };
  useEffect(() => {
    navigateUser();
  }, []);
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          color: COLORS.white,
        }}>
        <Image
          source={require('../assets/images/patient/2.png')}
          style={{width: 200, height: 200}}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: '500',
            alignSelf: 'center',
            marginVertical: 10,
            color: COLORS.primary,
          }}>
          Welcome to docbook
        </Text>
      </View>
    </>
  );
};

export default Splash;

const style = StyleSheet.create({
  modalBackGround: {
    // height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    // padding: 30,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  modalHeader: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
