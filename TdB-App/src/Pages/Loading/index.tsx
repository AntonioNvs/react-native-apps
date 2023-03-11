import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Gradient from '../../components/Gradient';
import Colors from '../../styles/globalColors';
import { Title, SubTitle, Image } from './styles';
import Background from '../../../assets/images/Frame.png';

const Loading: React.FC = () => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false)

  useEffect(() => {
    async function loadScreen() {
      await new Promise(r => setTimeout(r, 1000));
      AsyncStorage.getItem('@Inicial').then(response => {
        if (response === 'True') {
          navigation.navigate('Workspace');
        } else {
          navigation.navigate('OneScreenTutorial');
        }
      });
    }
    loadScreen();
    
    navigation.addListener('focus', () => setLoad(false));
    navigation.addListener('blur', () => setLoad(true));
  }, [navigation, load]);

  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />
      <Gradient alignItems="center" justifyContent="center">
        <Image source={Background}>
          <Title>TdB</Title>
          <SubTitle>Seu aplicativo de registro de testes para FLL</SubTitle>
        </Image>
      </Gradient>
    </>
  );
};

export default Loading;
