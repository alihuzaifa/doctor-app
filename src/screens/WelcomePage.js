import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../assets/common/Common';

const Welcome = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 3, flexDirection: 'column', backgroundColor: '#ddd'}}>
        <ImageBackground
          source={require('../assets/images/welcome.png')}
          style={{flex: 1, width: '100%', backgroundColor: COLORS.white}}
        />
      </View>
      <View style={{flex: 2, backgroundColor: COLORS.white}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: COLORS.white,
          }}>
          <Text
            style={{
              fontFamily: 'OpenSans-Bold',
              color: COLORS.primary,
              fontSize: 30,
            }}>
            Welcome To DocBook
          </Text>
          <Text
            style={{
              maxWidth: '50%',
              fontFamily: 'OpenSans-Medium',
              color: COLORS.primary,
              fontSize: 20,
              textAlign: 'center',
              paddingTop: 10,
              fontWeight: '600',
            }}>
            Let's Find Your Doctor
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={{
              justifyContent: 'center',
              width: '95%',
              backgroundColor: COLORS.primary,
              height: 50,
              marginBottom: 30,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 15,
                letterSpacing: 1.5,
                textAlign: 'center',
                position: 'relative',
                fontFamily: 'OpenSans-SemiBold',
                color: COLORS.white,
              }}>
              Doctor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignInScreen');
            }}
            style={{
              justifyContent: 'center',
              width: '95%',
              backgroundColor: COLORS.primary,
              height: 50,
              marginBottom: 30,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 15,
                letterSpacing: 1.5,
                textAlign: 'center',
                position: 'relative',
                fontFamily: 'OpenSans-SemiBold',
                color: COLORS.white,
              }}>
              Patient
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
