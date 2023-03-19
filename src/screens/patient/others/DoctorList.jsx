import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../assets/common/Common';
import axios from 'axios';
import NetChecking from '../../NetChecking';

const DoctorList = ({navigation}) => {
  const [doctors, setDoctors] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const getAllDoctors = async () => {
    const getDoctorsData = await axios.get('http://drapp.somee.com/api/tblDrs');

    const filterDoctoData = getDoctorsData?.data?.map((item, index) => {
      return {
        availableDay: item?.availableDay,
        name: item?.drName,
        drEmail: item?.drEmail,
        drPhone: item?.drPhone,
        expertInDisease: item?.expertInDisease,
        id: item?.id,
        price: 0,
        src: require('../../../assets/images/patient/1.png'),
        details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
      };
    });
    setDoctors(filterDoctoData);
  };
  useEffect(() => {
    getAllDoctors();
  }, []);
  const CartCard = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={style.cartCard}
          onPress={() => navigation.navigate('DetailsScreen', item)}>
          <Image
            source={require('../../../assets/images/patient/1.png')}
            style={{height: 80, width: 80}}
          />
          <View
            style={{
              height: 80,
              marginLeft: 10,
              paddingVertical: 20,
              flex: 1,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Doctor :{item?.name}
            </Text>
            <Text style={{fontSize: 13, color: COLORS.grey}}>
              Expert In :{item?.expertInDisease}
            </Text>
          </View>
        </TouchableOpacity>
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
                All Doctor
              </Text>
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 80}}
              data={doctors}
              renderItem={({item}) => <CartCard item={item} />}
            />
          </View>
        </>
      ) : null}
      <NetChecking isConnected={isConnected} setIsConnected={setIsConnected} />
    </SafeAreaView>
  );
};

export default DoctorList;

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
});
