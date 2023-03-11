import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Gradient from '../../components/Gradient';
import HeaderInitial from '../../components/Header';
import Colors from '../../styles/globalColors';

import {
  TextContainer,
  Container,
  WelcomeText,
  GoodLuckText,
  TextTitle,
  TextData,
  TextSubTitle,
  DataPartContainer,
  Button,
  TextButton,
  PartContainer,
  SubPartContainer
} from './styles';
import { View } from 'react-native';
import getRealm from '../../services/realm';
import { searchNumberRegister } from '../../utils/searchRegister';

const DashboardMain: React.FC = () => {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: -100 }));
  const [opacity] = useState(new Animated.Value(0));
  const [load, setLoad] = useState(false);

  const [nameWorkspace, setNameWorkspace] = useState('');
  const [dataInformation, setDataInformation] = useState({
    allTests: 0,
    lastWeek: 0,
  })

  const navigation = useNavigation();


  useEffect(() => {
    if (load) {
      Animated.parallel([
        Animated.spring(offset.y, {
          toValue: 120,
          speed: 10000,
          bounciness: 0,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 10,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(offset.y, {
          toValue: 0,
          speed: 2,
          bounciness: 0,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }

    navigation.addListener('focus', () => setLoad(false));
    navigation.addListener('blur', () => setLoad(true));
  }, [load, navigation, opacity, offset]);

  // Toda vez que carregar essa tela, carregar qual que é o meu workspace
  // atual

  useEffect(() => {
    // Carregando o workspace atual
    AsyncStorage.getItem('@WorkspaceActual').then(response => {
      if (response) {
        // Se existe algo, então procure no Banco o Workspace
        async function loadData() {
          const realm = await getRealm();

          const result = realm
            .objects('Workspace')
            .find(row => row.name === response);

          if (result) {
            setNameWorkspace(result.name);
          } else {
            setNameWorkspace('')
          }

          const { allTests, lastWeek } = await searchNumberRegister(response)
          setDataInformation({ allTests, lastWeek })

        }
        loadData();
      }
    });

    navigation.addListener('focus', () => setLoad(false));
    navigation.addListener('blur', () => {
      setLoad(true)
    });
  }, [load]);

  function handleNavigateToRegister() {
    if(nameWorkspace)
      navigation.navigate('Register');
  }

  function handleNavigateToStatistics() {
    if(dataInformation.allTests > 0)
      navigation.navigate('Statistics');
  }

  return (
    <Gradient>
      <HeaderInitial initial />
      <Animated.View
        style={{
          flex: 1,
          opacity: opacity,
          transform: [{ translateY: offset.y }],
        }}
      >
        <TextContainer>
          <WelcomeText>Bem vindo!</WelcomeText>
          <GoodLuckText>Boa sorte em seus testes :)</GoodLuckText>
        </TextContainer>
        <Container>
          <TextTitle>
            {nameWorkspace ? nameWorkspace : 'Arraste para o lado para criar um workspace!'}
          </TextTitle>
          <PartContainer>
            <SubPartContainer>
              <DataPartContainer>
                <TextSubTitle>Total de testes</TextSubTitle>
                <TextData>{nameWorkspace ? dataInformation.allTests : '?'}</TextData>
              </DataPartContainer>

              <Button
                color={`${Colors.redButton}`}
                onPress={handleNavigateToStatistics}
                disable={dataInformation.allTests === 0}
              >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <MaterialIcons
                    name="equalizer"
                    size={36}
                    color={`${Colors.textWhite}`}
                  />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <TextButton>Estatísticas</TextButton>
                </View>
              </Button>
            </SubPartContainer>

            <SubPartContainer>
              <DataPartContainer>
                <TextSubTitle>Últimos 7 dias</TextSubTitle>
                <TextData>{nameWorkspace ? dataInformation.lastWeek : '?'}</TextData>
              </DataPartContainer>

              <Button
                color={`${Colors.greenButton}`}
                onPress={handleNavigateToRegister}
                disable={nameWorkspace ? false : true}
              >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <MaterialIcons
                    name="note-add"
                    size={36}
                    color={`${Colors.textWhite}`}
                  />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <TextButton>Bora fazer Teste?</TextButton>
                </View>
              </Button>
            </SubPartContainer>
          </PartContainer>
        </Container>
      </Animated.View>
    </Gradient>
  );
};

export default DashboardMain;
