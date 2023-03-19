import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
  Button,
  Modal,
  ActivityIndicator,
} from 'react-native';
import COLORS from '../../../assets/common/Common';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cross from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NetChecking from '../../NetChecking';

const DetailsScreen = ({navigation, route}) => {
  const categories = ['Morning', 'Afternoon', 'Evening', 'Night', 'Sunday'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = React.useState(visible);
  const [visible, setVisible] = React.useState(false);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [time, setTime] = useState('10:00AM-12:00PM');
  const [date, setDate] = useState(1);

  const [availableSlots, setAvailableSlots] = useState([
    '10:00AM-12:00PM',
    '12:00PM-2:00PM',
    '2:00PM-4:00PM',
    '4:00PM-6:00PM',
    '6:00PM-8:00PM',
    '8:00PM-10:00PM',
  ]);

  const daysList = [];
  const getDaysLength = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const getMonthList = getDaysLength.slice(0, totalDays);

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
        <View style={style.modalBackGround}>
          <Animated.View
            style={[style.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };

  const Months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const item = route.params;

  const BookAppointment = async () => {
    setIsClicked(true);
    try {
      const value = await AsyncStorage.getItem('data');
      const data = JSON.parse(value);
      if (value !== null) {
        const appointmentDate = `${date} ${
          Months[new Date().getMonth()]
        } ${new Date().getFullYear()} ${time}`;
        console.log('appointmentDate', appointmentDate);
        const postObj = {
          id: 0,
          drId: item?.id,
          patientId: data?.id,
          // appointDateTime: appointmentDate,
          appointDateTime: new Date().toDateString(),
          isApproved: false,
          isComplete: false,
          createDate: new Date().toDateString(),
          active: true,
        };
        // const postObj = {
        //   id: 0,
        //   drId: 44,
        //   patientId: 48,
        //   appointDateTime: '2023-03-18T21:18:26.962Z',
        //   isApproved: false,
        //   isComplete: false,
        //   createDate: '2023-03-18T21:18:26.962Z',
        //   active: true,
        // };
        try {
          const postData = await axios.post(
            `http://drapp.somee.com/api/tblAppointments`,
            postObj,
          );
          console.log(postData?.data);
          if (postData?.data) {
            setVisible(true);
            setTimeout(() => {
              navigation.navigate('PatientNavigator');
            }, 2000);
            setIsClicked(false);
          } else {
            alert('Appoinment is not booked');
            setIsClicked(false);
          }
          // navigation.navigate('SignInScreen');
          setIsClicked(false);
        } catch (error) {
          alert(error);
          setIsClicked(false);
        }
        // const postData = await axios.post(
        //   `http://drapp.somee.com/api/tblAppointments`,
        //   postObj,
        // );
        // if (postData?.status === 201) {
        //   setVisible(true);
        //   navigation.navigate('PatientHome');
        // }
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
      setIsClicked(false);
    }
  };

  return (
    <>
      {isConnected ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: COLORS.white,
            paddingBottom: 20,
            // flex: 1,
          }}>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="rgba(0,0,0,0)"
          />
          <ImageBackground style={style.headerImage} source={item.src}>
            <View style={style.header}>
              <Icon
                name="arrow-back-ios"
                size={28}
                color={COLORS.white}
                onPress={navigation.goBack}
              />
              <Icon name="bookmark-border" size={28} color={COLORS.white} />
            </View>
          </ImageBackground>
          <View>
            <View style={{marginTop: 20, paddingHorizontal: 20}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Expert In: {item.expertInDisease}
              </Text>
            </View>
            <View style={{marginTop: 20, paddingHorizontal: 20}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Dr Name: {item.name}
              </Text>
            </View>
            {/* <CategoryList /> */}

            <View style={{marginTop: 20, paddingHorizontal: 20}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Available Slots
              </Text>
            </View>
            {availableSlots?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setTime(item);
                    setSelectedSlot(index);
                  }}
                  style={[
                    style.slot,
                    {
                      backgroundColor:
                        selectedSlot === index ? COLORS.primary : COLORS.white,
                    },
                  ]}>
                  <Text
                    style={{
                      color:
                        selectedSlot === index ? COLORS.white : COLORS.primary,
                      fontWeight: 'bold',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <View style={{marginTop: 20, paddingHorizontal: 20}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Selected Date
              </Text>
            </View>
            <FlatList
              horizontal
              contentContainerStyle={{
                paddingLeft: 15,
              }}
              data={getMonthList}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setDate(item);
                      setSelectedDate(index);
                    }}
                    style={[
                      style.dateSlot,
                      {
                        backgroundColor:
                          selectedDate == index ? COLORS.primary : COLORS.white,
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          selectedDate == index ? COLORS.white : COLORS.primary,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            {/* For Moda Popup */}
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ModalPoup visible={visible}>
                <View style={{alignItems: 'center'}}>
                  <View style={style.header}>
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

                <Text
                  style={{
                    marginVertical: 30,
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  Congratulations Appointment was successful
                </Text>
              </ModalPoup>
            </View>

            {/* For Moda Popup */}

            <TouchableOpacity
              style={{
                backgroundColor: isClicked ? COLORS.light : COLORS.primary,
                height: 50,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
                marginHorizontal: 15,
              }}
              disabled={isClicked}
              onPress={BookAppointment}>
              <Text
                style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
                {isClicked ? <ActivityIndicator /> : 'Book Now'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : null}
      <NetChecking isConnected={isConnected} setIsConnected={setIsConnected} />
    </>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  categoryListContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginHorizontal: 10,
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
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  slot: {
    // width: '100%',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  dateSlot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 20,
  },
});

export default DetailsScreen;
