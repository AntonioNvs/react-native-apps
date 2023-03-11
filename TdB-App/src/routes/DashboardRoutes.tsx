import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardWorkspace from '../Pages/DashboardWorkspace';
import DashboardStatistics from '../Pages/DashboardStatistics';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../styles/globalColors';

const { Navigator, Screen } = createBottomTabNavigator();

const DashboardRoutes: React.FC = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'Archivo-Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d',
      }}
    >
      <Screen
        name="Workspace"
        component={DashboardWorkspace}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="home"
              size={size}
              color={focused ? Colors.black : color}
            />
          ),
        }}
      />
      <Screen
        name="Geral"
        component={DashboardStatistics}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="public"
              size={size}
              color={focused ? Colors.black : color}
            />
          ),
        }}
      />
    </Navigator>
  );
};

export default DashboardRoutes;
