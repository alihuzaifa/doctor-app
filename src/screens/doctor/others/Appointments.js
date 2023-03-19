import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';
import COLORS from '../../../assets/common/Common';
import Icon from 'react-native-vector-icons/AntDesign';
import Cross from 'react-native-vector-icons/Entypo';
import Succeed from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetChecking from '../../NetChecking';
// import BasicButton from './Button';

const Appointment = ({navigation}) => {
  const [appointments, setappointments] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const getAllDoctors = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    const getAppointments = await axios.get(
      `http://drapp.somee.com/SelectApprovedAppointmentByDrId?drId=${data?.id}`,
    );
    console.log('getAppointments?.data', getAppointments?.data?.Data);
    setappointments(getAppointments?.data?.Data);
  };
  useEffect(() => {
    getAllDoctors();
  }, []);

  const [visible, setVisible] = React.useState(false);
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  const ModalPoup = ({visible, children}) => {
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
          <Animated.View
            style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };
  const menuItems = [
    {
      id: '1',
      title: 'Haris',
      icon: require('../../../assets/images/patient/1.png'),
      drId: 3,
      Id: 3,
      PatientId: 3,
      appointmentTime: new Date().toDateString(),
    },
    {
      id: '2',
      title: 'Notifications',
      icon: require('../../../assets/images/patient/2.png'),
      drId: 3,
      Id: 3,
      PatientId: 3,
      appointmentTime: new Date().toDateString(),
    },
    {
      id: '3',
      title: 'Settings',
      icon: require('../../../assets/images/patient/3.png'),
      drId: 3,
      Id: 3,
      PatientId: 3,
      appointmentTime: new Date().toDateString(),
    },
  ];

  const renderItem = ({item}) => (
    <>
      <View
        style={{
          borderWidth: 0.5,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 5,
          paddingVertical: 5,
          borderRadius: 10,
        }}>
        <View style={{width: '20%'}}>
          <Image
            source={require('../../../assets/images/patient/1.png')}
            style={{width: 80, height: 80, borderRadius: 40}}
          />
        </View>
        <View style={{width: '70%'}}>
          <Text style={{paddingVertical: 2}}>Patient Name : Huzaifa</Text>
          <Text style={{paddingVertical: 2}}>Phone: 03111260357 </Text>
          <Text style={{paddingVertical: 2}}>Email: ha4587323@gmail.com </Text>
          <Text style={{paddingVertical: 2}}>
            Booking Date: {new Date().toDateString()}{' '}
          </Text>
        </View>
        <View
          style={{
            width: '10%',
          }}>
          <TouchableOpacity style={{marginVertical: '25%'}}>
            <Succeed name="done" size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginVertical: '25%'}}>
            <Succeed name="cancel" size={28} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <>
      {isConnected ? (
        <>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Dashboard</Text>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => {
                  navigation.navigate('DoctorProfile');
                }}>
                <Icon
                  name="user"
                  size={30}
                  style={{marginLeft: 20, color: COLORS.white}}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={appointments}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.menuList}
            />
          </View>
          <View>
            <ModalPoup visible={visible}>
              <View style={{alignItems: 'center'}}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setVisible(false)}>
                    <Cross size={35} name="cross" color="red" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/modal/success.png')}
                  style={{height: 150, width: 150, marginVertical: 10}}
                />
              </View>

              <TouchableOpacity
                style={{
                  width: '60%',
                  height: 50,
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 30,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  Booked
                </Text>
              </TouchableOpacity>
            </ModalPoup>
          </View>
        </>
      ) : null}
      <NetChecking isConnected={isConnected} setIsConnected={setIsConnected} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuList: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  mainMenu: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    elevation: 1,
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderRadius: 20,
    elevation: 20,
    paddingTop: 10,
  },
  modalHeader: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default Appointment;
