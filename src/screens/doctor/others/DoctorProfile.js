import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  TextInput,
  Animated,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import COLORS from '../../../assets/common/Common';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import STYLES from '../../../assets/style';
import {useFormik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dots from 'react-native-vector-icons/Entypo';

import {
  doctorProfileInitialSchema,
  doctorProfileInitialValues,
} from '../../../assets/schema';
import axios from 'axios';
import NetChecking from '../../NetChecking';

const DoctorProfile = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [show, setShow] = useState(false);
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
        <View style={style.modalBackGround}>
          <Animated.View
            style={[style.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };

  const formik = useFormik({
    initialValues: doctorProfileInitialValues,
    validationSchema: doctorProfileInitialSchema,
    onSubmit: async values => {
      const obj = {
        id: 0,
        drName: values?.drName,
        expertInDisease: values?.expertInDisease,
        availableDay: values?.availableDay,
        drPhone: String(values?.drPhone),
        drEmail: String(values?.drEmail),
        drPassword: values?.drPassword,
        createDate: new Date().toDateString(),
        active: true,
        drAddress: values?.drPassword,
      };
      setIsClicked(true);
      try {
        const postData = await axios.put(
          `http://drapp.somee.com/api/tblPatients/${values?.id}`,
          obj,
        );
        console.log('postData', postData?.data);
        setIsClicked(false);
      } catch (error) {
        alert(error);
        setIsClicked(false);
      }
    },
  });

  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem('data');
      navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOpen = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };
  let options = {savePhotos: true, mediaType: 'photo'};

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const picture = await launchCamera(options);
      console.log('picture', picture);
    } else {
      console.log('Error Succed');
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    console.log(result);
  };
  const getDoctorData = async () => {
    try {
      const value = await AsyncStorage.getItem('data');
      const data = JSON.parse(value);
      formik.setValues(data);
    } catch (err) {}
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={style.header2}>
          <Text style={style.headerTitle}>PROFILE</Text>
          <TouchableOpacity
            style={style.headerButton}
            onPress={() => {
              setShow(!show);
              // navigation.navigate('DoctorProfile');
            }}>
            <Dots
              name="dots-three-vertical"
              size={24}
              style={{marginLeft: 20, color: COLORS.white}}
            />
          </TouchableOpacity>
        </View>
        {show ? (
          <View
            style={{
              width: 200,
              height: 100,
              backgroundColor: COLORS.white,
              elevation: 1,
              position: 'absolute',
              right: 5,
              zIndex: 1,
              top: 50,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                removeItem();
              }}>
              <Text style={style.menuItem}>Logout</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity>
            <Text
              style={style.menuItem}
              onPress={() => {
                setVisible(true);
                setShow(false);
              }}>
              Change Url
            </Text>
          </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                setShow(false);
              }}>
              <Text style={style.menuItem}>Delete Profile</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {isConnected ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{paddingHorizontal: 20}}>
            <TouchableOpacity
              onPress={handleOpen}
              style={{
                borderWidth: 0.5,
                width: 120,
                height: 120,
                alignSelf: 'center',
                borderRadius: 60,
                marginTop: '10%',
              }}>
              <Image
                source={require('../../../assets/images/patient/1.png')}
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: 'center',
                  borderRadius: 50,
                  marginTop: '10%',
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 19,
                fontWeight: '500',
                marginTop: 10,
              }}>
              Your Profile
            </Text>
            <View style={STYLES.inputContainer}>
              <Icon
                name="person-outline"
                color={COLORS.primary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                id="drName"
                name="drName"
                onChangeText={formik.handleChange('drName')}
                onBlur={formik.handleBlur('drName')}
                value={formik.values.drName}
                placeholder="Name"
                style={STYLES.input}
                placeholderTextColor={COLORS.light}
              />
            </View>
            {formik.errors.drName && formik.touched.drName ? (
              <Text style={STYLES.error}>{formik.errors.drName}</Text>
            ) : null}
            <View style={STYLES.inputContainer}>
              <Icon
                name="mail-outline"
                color={COLORS.primary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                id="drEmail"
                name="drEmail"
                onChangeText={formik.handleChange('drEmail')}
                onBlur={formik.handleBlur('drEmail')}
                value={formik.values.drEmail}
                placeholder="Email"
                style={STYLES.input}
                placeholderTextColor={COLORS.light}
              />
            </View>
            {formik.errors.drEmail && formik.touched.drEmail ? (
              <Text style={STYLES.error}>{formik.errors.drEmail}</Text>
            ) : null}
            <View style={STYLES.inputContainer}>
              <Icon
                name="local-hospital"
                color={COLORS.primary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                id="expertInDisease"
                name="expertInDisease"
                onChangeText={formik.handleChange('expertInDisease')}
                onBlur={formik.handleBlur('expertInDisease')}
                value={formik.values.expertInDisease}
                placeholder="Expertize"
                style={STYLES.input}
                placeholderTextColor={COLORS.light}
              />
            </View>
            {formik.errors.expertInDisease && formik.touched.expertInDisease ? (
              <Text style={STYLES.error}>{formik.errors.expertInDisease}</Text>
            ) : null}
            <View style={STYLES.inputContainer}>
              <Icon
                name="phone"
                color={COLORS.primary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                id="drPhone"
                name="drPhone"
                onChangeText={formik.handleChange('drPhone')}
                onBlur={formik.handleBlur('drPhone')}
                value={formik.values.drPhone}
                placeholder="Phone"
                style={STYLES.input}
                placeholderTextColor={COLORS.light}
              />
            </View>
            {formik.errors.drPhone && formik.touched.drPhone ? (
              <Text style={STYLES.error}>{formik.errors.drPhone}</Text>
            ) : null}
            <View style={STYLES.inputContainer}>
              <Icon
                name="lock-outline"
                color={COLORS.primary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                id="drPassword"
                name="drPassword"
                onChangeText={formik.handleChange('drPassword')}
                onBlur={formik.handleBlur('drPassword')}
                value={formik.values.drPassword}
                placeholder="Password"
                style={STYLES.input}
                placeholderTextColor={COLORS.light}
              />
            </View>
            {formik.errors.drPassword && formik.touched.drPassword ? (
              <Text style={STYLES.error}>{formik.errors.drPassword}</Text>
            ) : null}
            <View style={STYLES.inputContainer}>
              <Icon
                name="location-on"
                color={COLORS.primary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                id="drAddress"
                name="drAddress"
                onChangeText={formik.handleChange('drAddress')}
                onBlur={formik.handleBlur('drAddress')}
                value={formik.values.drAddress}
                placeholder="Address"
                style={STYLES.input}
                placeholderTextColor={COLORS.light}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: isClicked ? COLORS.light : COLORS.primary,
                height: 50,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}
              disabled={isClicked}
              onPress={formik.submitForm}>
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {isClicked ? <ActivityIndicator /> : 'Update Profile'}
              </Text>
            </TouchableOpacity>
            {/* For Moda Popup */}

            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ModalPoup visible={visible}>
                <View style={{alignItems: 'center'}}>
                  <View style={style.modalHeader}>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                      <Dots size={35} name="cross" color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 20,
                    fontWeight: '500',
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}>
                  Are you sure ?
                </Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      style.btn,
                      {
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                        backgroundColor: 'transparent',
                      },
                    ]}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                        color: COLORS.primary,
                      }}>
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <View style={{width: 15}} />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={style.btn}
                    onPress={() => setVisible(false)}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                        color: COLORS.white,
                      }}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </ModalPoup>
            </View>
            <Modal
              isVisible={isModalVisible}
              onBackdropPress={handleClose}
              onSwipeComplete={handleClose}
              swipeDirection={['down']}
              style={{justifyContent: 'flex-end', margin: 0}}>
              <View style={{backgroundColor: 'white', height: 240}}>
                <TouchableOpacity
                  onPress={openGallery}
                  style={{
                    width: '92%',
                    height: 60,
                    borderRadius: 5,
                    borderWidth: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                    backgroundColor: COLORS.primary,
                    alignSelf: 'center',
                  }}>
                  <Text style={{color: COLORS.white, fontSize: 18}}>
                    Upload Photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={openCamera}
                  style={{
                    width: '92%',
                    height: 60,
                    borderRadius: 5,
                    borderWidth: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                    backgroundColor: COLORS.primary,
                    alignSelf: 'center',
                  }}>
                  <Text style={{color: COLORS.white, fontSize: 18}}>
                    Take Photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '92%',
                    height: 60,
                    borderRadius: 5,
                    borderWidth: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                    backgroundColor: COLORS.primary,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{color: COLORS.white, fontSize: 18}}
                    onPress={handleClose}>
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </ScrollView>
        ) : null}
        <NetChecking
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
      </SafeAreaView>
    </>
  );
};

export default DoctorProfile;

const style = StyleSheet.create({
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  header2: {
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
  menuItem: {
    padding: 15,
    borderBottomWidth: 0.5,
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
  },
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
