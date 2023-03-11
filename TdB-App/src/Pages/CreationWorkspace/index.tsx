/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../styles/globalColors';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getRealm from '../../services/realm';
import AsyncStorage from '@react-native-community/async-storage';

import Gradient from '../../components/Gradient';
import Header from '../../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  MainContainer,
  Title,
  InputContainer,
  DataContainer,
  TextInformation,
  InputTitle,
  ButtonMissions,
  TimeContainer,
  TimeView,
  TextTime,
  InputTime,
  PointText,
  ButtonSend,
  Error,
} from './styles';
import ViewAnimated from '../../components/ViewAnimated';

const CreationWorkspace: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleCorrect, setTitleCorrect] = useState(true);
  const [storaged, setStoraged] = useState([]);
  const [load, setLoad] = useState(false);
  const [numbersMissions, setNumbersMissions] = useState(0)
  const [missionsSelected, setMissionsSelected] = useState([])
  const [errorMissionNotSelected, setErrorMissionNotSelected] = useState(true)

  const secondsRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadDatabase() {
      const realm = await getRealm();

      const data = realm.objects('Workspace');

      setStoraged(data);
    }
    loadDatabase();
  }, []);

  // Carregando número de missões e as missões selecionadas para salvar
  useEffect(() => {
    // Toda vez que sair da tela ou voltar, recarregue esse useEffect
    navigation.addListener('focus', () => setLoad(false));
    navigation.addListener('blur', () => {
      setLoad(true)
      return;
    });

    AsyncStorage.getItem('@MissionsSelected').then(response => {
      // Se o valor não for nulo, salve os novos dados nos estados
      if(response) {
        const missions = response.split(';');
        setMissionsSelected(missions)
        setNumbersMissions(missions.length)
      }
    });
  }, [load])

  useEffect(() => {
    const newTitle = modifyTitle(title);
    const titleExist = storaged.find(data => data.name === newTitle);

    !titleExist ? setTitleCorrect(true) : setTitleCorrect(false);
  }, [title, storaged]);

  function modifyTitle(title: string) {
    if (title) {
      const newTitle = title.trim();

      return newTitle[0].toUpperCase() + newTitle.substring(1);
    }
  }

  async function saveRepository() {
    const newTitle = modifyTitle(title);

    const realm = await getRealm();
    
    // Se o número de missões for igual a 0, o workspace não pode ser criado

    // Verificações
    if (numbersMissions !== 0 && titleCorrect && newTitle?.length > 0) {
      realm.write(() => {
        // Criando o registro de Workspace
        realm.create('Workspace', {
          name: newTitle,
        });
        
        // Criando o registo de WorkspaceMission
        for(let mission of missionsSelected) {
          realm.create('WorkspaceMission', {
            workspace: newTitle,
            mission
          })
        }
      });

      AsyncStorage.setItem('@WorkspaceActual', newTitle);
      return true;
    }
    return false;
  }

  async function handleCreate() {
    try {
      if (await saveRepository()) {
        AsyncStorage.setItem('@MissionsSelected', '') // Zerando o número de missões
        navigation.navigate('Workspace');
      }
    } catch (err) {
      Alert.alert(String(err));
    }
  }

  return (
    <Gradient>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Header initial={false} />
        <MainContainer>
          <ViewAnimated flex={0}>
            <Title>Criando Workspace</Title>
            <InputContainer>
              <MaterialIcons name="work" size={24} color={Colors.gray} />
              <InputTitle
                maxLength={32}
                placeholder="Nome"
                value={title}
                onChangeText={text => setTitle(text)}
              />
            </InputContainer>

            {!titleCorrect && <Error>* Esse título já existe</Error>}

            <DataContainer>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <TextInformation color={Colors.black} align="left">
                    Totais:{' '}
                  </TextInformation>
                  <TextInformation color={Colors.gray} align="left">
                    {numbersMissions}
                  </TextInformation>
                </View>
                <ButtonMissions
                  onPress={() => navigation.navigate('SelectMissions')}
                >
                  <TextInformation color={Colors.background} align="center">
                    Escolher Missões
                  </TextInformation>
                </ButtonMissions>
                {!errorMissionNotSelected && <Error>Selecione {'\n'}alguma missão!</Error>}
              </View>
              <ButtonSend onPress={handleCreate}>
                <MaterialIcons name="send" size={24} color={Colors.background} />
              </ButtonSend>
            </DataContainer>
          </ViewAnimated>
        </MainContainer>
      </KeyboardAvoidingView>
    </Gradient>
  );
};

export default CreationWorkspace;
