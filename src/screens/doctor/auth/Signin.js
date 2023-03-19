import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../assets/common/Common';
import STYLES from '../../../assets/style/index';
import {DoctorSiginInitialValues, DoctorSignin} from '../../../assets/schema';
import {useFormik} from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetChecking from '../../NetChecking';
const Signin = ({navigation}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const formik = useFormik({
    initialValues: DoctorSiginInitialValues,
    validationSchema: DoctorSignin,
    onSubmit: async values => {
      setIsClicked(true);
      try {
        const postData = await axios.get(
          `http://drapp.somee.com/drLogin?userEmail=${values?.email}&userPassword=${values?.password}`,
        );
        if (postData?.data?.Data !== null) {
          const postObj = postData?.data?.Data[0];
          const updatedObject = {...postObj, userStatus: 'Doctor'};
          const jsonValue = JSON.stringify(updatedObject);
          if (postData?.data?.isSuccess == true) {
            await AsyncStorage.setItem('data', jsonValue);
            navigation.navigate('Dashboard');
            setIsClicked(false);
          }
        } else if (
          postData?.data?.Data === null &&
          postData?.data?.isSuccess == false
        ) {
          alert(postData?.data?.message);
          setIsClicked(false);
        }
        setIsClicked(false);
      } catch (error) {
        alert(error);
        setIsClicked(false);
      }
    },
  });
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingTop: 80,
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        // alignItems: 'center',
      }}>
      {isConnected ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 70}}>
            <Text
              style={{fontSize: 27, fontWeight: 'bold', color: COLORS.primary}}>
              Welcome Back,
            </Text>
            <Text
              style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
              Sign in to continue
            </Text>
          </View>

          <View style={{marginTop: 20}}>
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
              onPress={() => {
                navigation.navigate('Dashboard');
              }}>
              {/* onPress={formik.handleSubmit}> */}
              <Text
                style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
                {isClicked ? <ActivityIndicator /> : 'Sign In'}
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
              marginBottom: 20,
            }}>
            <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
              Don`t have an account ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : null}
      <NetChecking isConnected={isConnected} setIsConnected={setIsConnected} />
    </SafeAreaView>
  );
};

export default Signin;
