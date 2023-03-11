import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerDashboardRoutes from './DrawerDashboardRoutes';
import CreationWorkspace from '../Pages/CreationWorkspace';
import Register from '../Pages/Register';
import SelectMissions from '../Pages/SelectMissions';
import Statistics from '../Pages/Statistics';
import AllTestes from '../Pages/AllTestes';
import ByMission from '../Pages/ByMission';
import OneScreenTutorial from '../Pages/Tutorial/One/index';
import TwoScreenTutorial from '../Pages/Tutorial/Two';
import ThreeScreenTutorial from '../Pages/Tutorial/Three';
import Loading from '../Pages/Loading';

const { Navigator, Screen } = createStackNavigator();

const routesWorkspace: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Loading" component={Loading} />
      <Screen name="OneScreenTutorial" component={OneScreenTutorial} />
      <Screen name="TwoScreenTutorial" component={TwoScreenTutorial} />
      <Screen name="ThreeScreenTutorial" component={ThreeScreenTutorial} />
      <Screen name="Workspace" component={DrawerDashboardRoutes} />
      <Screen name="Register" component={Register} />
      <Screen name="CreationWorkspace" component={CreationWorkspace} />
      <Screen name="SelectMissions" component={SelectMissions} />
      <Screen name="Statistics" component={Statistics} />
      <Screen name="AllTestes" component={AllTestes} />
      <Screen name="ByMission" component={ByMission} />
    </Navigator>
  );
};

export default routesWorkspace;
