import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Appointments from './Appointments';
import Icon from 'react-native-vector-icons/Fontisto';
import Check from './Check';
import COLORS from '../../../assets/common/Common';
import NetChecking from '../../NetChecking';
import {useState} from 'react';

const Tab = createBottomTabNavigator();

function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <>
      {isConnected ? (
        <Tab.Navigator
          screenOptions={{headerShown: false, tabBarShowLabel: false}}>
          <Tab.Screen
            name="Appointment"
            component={Appointments}
            options={{
              tabBarIcon: tabInfo => {
                return tabInfo.focused ? (
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: COLORS.white,
                      borderColor: COLORS.primary,
                      borderWidth: 2,
                      borderRadius: 30,
                      top: -25,
                      elevation: 5,
                    }}>
                    <Icon name="doctor" color={COLORS.primary} size={28} />
                  </View>
                ) : (
                  <Icon name="doctor" size={28} color={COLORS.primary} />
                );
              },
            }}
          />

          <Tab.Screen
            name="Check"
            component={Check}
            options={{
              tabBarIcon: tabInfo => {
                return tabInfo.focused ? (
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: COLORS.white,
                      borderColor: COLORS.primary,
                      borderWidth: 2,
                      borderRadius: 30,
                      top: -25,
                      elevation: 5,
                    }}>
                    <Icon name="check" color={COLORS.primary} size={28} />
                  </View>
                ) : (
                  <Icon name="check" size={28} color={COLORS.primary} />
                );
              },
            }}
          />
        </Tab.Navigator>
      ) : null}
      <NetChecking isConnected={isConnected} setIsConnected={setIsConnected} />
    </>
  );
}
export default Dashboard;
