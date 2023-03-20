import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Disease from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../../../assets/common/Common';
import STYLES from '../../../assets/style/index';
import {useFormik} from 'formik';
import {PatientInitialValues, PatientSignup} from '../../../assets/schema';
import axios from 'axios';
import NetChecking from '../../NetChecking';

const SignUpScreen = ({navigation}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const formik = useFormik({
    initialValues: PatientInitialValues,
    validationSchema: PatientSignup,
    onSubmit: async values => {
      const obj = {
        id: 0,
        patientName: values?.name,
        disease: values?.disease,
        patientPhone: values?.phoneNumber,
        patientEmail: values?.email,
        patientPassword: values?.password,
        active: true,
      };
      setIsClicked(true);
      try {
        const postData = await axios.post(
          `http://drapp.somee.com/api/tblPatients`,
          obj,
        );
        console.log('postData', postData?.data);
        navigation.navigate('SignInScreen');
        setIsClicked(false);
      } catch (error) {
        console.log(error);
        setIsClicked(false);
      }
    },
  });
  return (
    <SafeAreaView
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white}}>
      {isConnected ? (
        <ScrollView showsVerticalScrollIndicator={false}>
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
                id="name"
                name="name"
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                value={formik.values.name}
                placeholder="Patient Name"
                style={STYLES.input}
                placeholderTextColor={COLORS.light}
              />
            </View>
            {formik.errors.name && formik.touched.name ? (
              <Text style={STYLES.error}>{formik.errors.name}</Text>
            ) : null}
            <View style={STYLES.inputContainer}>
              <Disease
                name="disease"
                color={COLORS.primary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                id="disease"
                name="disease"
                onChangeText={formik.handleChange('disease')}
                onBlur={formik.handleBlur('disease')}
                value={formik.values.disease}
                placeholder="Disease"
                style={STYLES.input}
                placeholderTextColor={COLORS.light}
              />
            </View>
            {formik.errors.disease && formik.touched.disease ? (
              <Text style={STYLES.error}>{formik.errors.disease}</Text>
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
              //   navigation.navigate('SignInScreen');
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
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}>
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

export default SignUpScreen;
