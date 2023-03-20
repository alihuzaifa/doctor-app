import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../assets/common/Common';
import STYLES from '../../../assets/style/index';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useFormik} from 'formik';
import {DoctorInitialValues, DoctorSignup} from '../../../assets/schema';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import NetChecking from '../../NetChecking';

const SignUp = ({navigation}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState([]);
  const options = ['Option 1', 'Option 2', 'Option 3'];

  const [selectedOption, setSelectedOption] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleOptionPress = option => {
    setSelectedOption(option);
    setIsExpanded(false);
    // onSelect(option);
  };
  const [items, setItems] = useState([
    {label: 'Monday', value: '1'},
    {label: 'Tuesday', value: '2'},
    {label: 'Wednesday', value: '3'},
    {label: 'Thursday', value: '4'},
    {label: 'Friday', value: '5'},
    {label: 'Saturday', value: '6'},
    {label: 'Sunday', value: '7'},
  ]);

  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(date.toLocaleTimeString());
    formik.setFieldValue('time', date.toLocaleTimeString());
    hideDatePicker();
  };

  const formik = useFormik({
    initialValues: DoctorInitialValues,
    validationSchema: DoctorSignup,
    onSubmit: async values => {
      const postObj = {
        id: 0,
        drName: values?.drName,
        expertInDisease: values?.expert,
        availableDay: 'Sunday',
        drPhone: String(values?.phoneNumber),
        drEmail: values?.email,
        drPassword: values?.password,
        createDate: new Date().toDateString(),
        active: true,
        drAddress: 'Karachi',
      };
      const anotherObj = {
        id: 46,
        drName: 'Huzaifa',
        expertInDisease: 'Heart',
        availableDay: 'Sunday',
        drPhone: '03111260357',
        drEmail: 'huzaifa@gmail.com',
        drPassword: '12345678',
        createDate: '2023-03-18T21:18:26.984Z',
        active: true,
        drAddress: 'karachi',
      };
      console.log(postObj);
      setIsClicked(true);
      try {
        const postData = await axios.post(
          `http://drapp.somee.com/api/tblDrs`,
          postObj,
        );
        navigation.navigate('Login');
        setIsClicked(false);
      } catch (error) {
        setIsClicked(false);
        console.log(error);
      }
    },
  });
  return (
    <SafeAreaView
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white}}>
      {isConnected ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View style={{marginTop: 70}}>
            <Text
              style={{fontSize: 27, fontWeight: 'bold', color: COLORS.primary}}>
              Welcome Back,
            </Text>
            <Text
              style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
              Sign up to continue
            </Text>
          </View>

          <View style={{marginTop: 20}}>
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
                placeholder="Dr name"
                style={STYLES.input}
                placeholderTextColor={COLORS.light}
              />
            </View>
            {formik.errors.drName && formik.touched.drName ? (
              <Text style={STYLES.error}>{formik.errors.drName}</Text>
            ) : null}
            <View style={STYLES.inputContainer}>
              <Icon
                name="local-hospital"
                color={COLORS.primary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                id="expert"
                name="expert"
                onChangeText={formik.handleChange('expert')}
                onBlur={formik.handleBlur('expert')}
                value={formik.values.expert}
                placeholder="Speciality"
                style={STYLES.input}
                placeholderTextColor={COLORS.light}
              />
            </View>
            {formik.errors.expert && formik.touched.expert ? (
              <Text style={STYLES.error}>{formik.errors.expert}</Text>
            ) : null}
            <View style={STYLES.inputContainer}>
              <Icon
                name="mail-outline"
                color={COLORS.primary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                id="email"
                name="email"
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
                placeholder="Email"
                style={STYLES.input}
                placeholderTextColor={COLORS.light}
              />
            </View>
            {formik.errors.email && formik.touched.email ? (
              <Text style={STYLES.error}>{formik.errors.email}</Text>
            ) : null}
            <View style={STYLES.inputContainer}>
              <Icon
                name="phone"
                color={COLORS.primary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                id="phoneNumber"
                name="phoneNumber"
                onChangeText={formik.handleChange('phoneNumber')}
                onBlur={formik.handleBlur('phoneNumber')}
                value={formik.values.phoneNumber}
                placeholder="Phone"
                style={STYLES.input}
                placeholderTextColor={COLORS.light}
                keyboardType="numeric"
              />
            </View>
            {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
              <Text style={STYLES.error}>{formik.errors.phoneNumber}</Text>
            ) : null}
            <View style={STYLES.inputContainer}>
              <Icon
                name="lock-outline"
                color={COLORS.primary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                id="password"
                name="password"
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
                placeholder="Password"
                style={STYLES.input}
                secureTextEntry
                placeholderTextColor={COLORS.light}
              />
            </View>
            {formik.errors.password && formik.touched.password ? (
              <Text style={STYLES.error}>{formik.errors.password}</Text>
            ) : null}
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
              // onPress={() => {
              //   navigation.navigate('Login');
              // }}>
              onPress={formik.submitForm}>
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {isClicked ? <ActivityIndicator /> : 'Sign up'}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginTop: 40,
              marginBottom: 20,
            }}>
            <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
              Already have an account ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : null}
      <NetChecking isConnected={isConnected} setIsConnected={setIsConnected} />
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  header: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    color: '#333333',
  },
  options: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    elevation: 1,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
});
