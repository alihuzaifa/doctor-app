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
import COLORS from '../../../assets/common/Common';
import React, {useState} from 'react';
import NetChecking from '../../NetChecking';

const Check = ({navigation}) => {
  const [isConnected, setIsConnected] = useState(false);

  const CartCard = ({item}) => {
    return (
      <>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity>
            <Icon name="done" size={28} color={COLORS.dark} />
          </TouchableOpacity>
        </View>
        <View style={style.cartCard}>
          <Image
            source={require('../../../assets/images/patient/1.png')}
            style={{height: 80, width: 80}}
          />
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 20,
              flex: 1,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Haris</Text>
            <Text style={{fontSize: 13, color: COLORS.grey}}>Dr Anees</Text>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              {new Date().toDateString()}
            </Text>
          </View>
          <View style={{marginRight: 20, alignItems: 'center'}}>
            {/* <Text style={{fontWeight: 'bold', fontSize: 18}}>Payment</Text> */}
            <View style={style.actionBtn}>
              <Text style={{color: COLORS.white}}>Successful</Text>
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      {isConnected ? (
        <>
          <View style={style.header}>
            <Icon
              name="arrow-back-ios"
              color={COLORS.primary}
              size={28}
              onPress={navigation.goBack}
            />
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: COLORS.primary}}>
              Delivered 1
            </Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 80}}
            data={[1, 1, 1, 1, 1, 1]}
            renderItem={({item}) => <CartCard item={item} />}
          />
        </>
      ) : null}
      <NetChecking isConnected={isConnected} setIsConnected={setIsConnected} />
    </SafeAreaView>
  );
};

export default Check;

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
    // padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 90,
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
