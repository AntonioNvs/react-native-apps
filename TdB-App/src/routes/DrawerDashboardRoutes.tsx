import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DashboardRoutes from './DashboardRoutes';
import DashboardDrawer from '../Pages/DashboardDrawer';
import Colors from '../styles/globalColors';
import { StatusBar } from 'react-native';

const { Navigator, Screen } = createDrawerNavigator();

const DrawerDashboardRoutes: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />
      <Navigator
        overlayColor={Colors.whiteOpacity}
        drawerContent={({ navigation }) => (
          <DashboardDrawer navigation={navigation} />
        )}
        statusBarAnimation="fade"
      >
        <Screen name="Dashboard" component={DashboardRoutes} />
      </Navigator>
    </>
  );
};

export default DrawerDashboardRoutes;
