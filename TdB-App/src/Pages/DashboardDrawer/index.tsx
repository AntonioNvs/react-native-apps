/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, View, StatusBar, Alert } from 'react-native';
import { NavigationHelpers, useNavigation } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import Colors from '../../styles/globalColors';

import {
  Title,
  Card,
  TopCard,
  TitleWorkspace,
  BottomCard,
  Text,
  Container,
  Credits,
  ContainerCredits,
  TextCredits,
  CreditsRedes,
} from './styles';

import getRealm from '../../services/realm';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import rounding from '../../utils/rounding';

interface OptionsDrawer {
  navigation: NavigationHelpers;
}

interface Data {
  name: string;
  media: number;
  qtd: number;
}

const DashoboardDrawer: React.FC<OptionsDrawer> = ({ navigation }) => {
  const [data, setData] = useState<Data[]>();
  const [remove, setRemove] = useState(false)
  const [load, setLoad] = useState(false);

  const navigate = useNavigation();

  const isDrawerOpen = useIsDrawerOpen();

  useEffect(() => {
    navigate.addListener('focus', () => setLoad(!load));

    async function loadDatabase() {
      const realm = await getRealm();

      const objects = realm.objects('Workspace');
      const registers = realm.objects('Register');

      // Capturando os dados
      setData(objects.map(object => {
        const registersOfWorkspace = registers.filter(row => row.workspace_name === object.name)

        // Média
        let sum = registersOfWorkspace.reduce((acc, crr) => acc + crr.pontuation, 0);
        let best = 0;
        registersOfWorkspace.forEach(rW => {
          if(rW.pontuation > best)
            best = rW.pontuation
        })
        const size = registersOfWorkspace.length;
        const media = rounding((sum / size) / best, 3);

        return {
          name: object.name,
          media: media ? media * 100 : 0,
          qtd: size
        }
      }))
    }

    loadDatabase();
  }, [load, navigate, remove]);

  function openInstagram() {
    const url = 'instagram://user?username=anthnioneves';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  function openGithub() {
    const url = 'https://github.com/AntonioNvs';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  async function handleWorkspace(name: string) {
    // Caso eu esteja querendo remover o workspace, não entre nele
    await new Promise(resolve => { setTimeout(() => { resolve('result') }, 50)});

    if(!remove) {
      AsyncStorage.getItem('@WorkspaceActual').then(response => {
        if(response !== name)
          AsyncStorage.setItem('@WorkspaceActual', name)
          navigate.goBack()
      })
    }
  }

  function deleteWorkspace(name: string) {
    setRemove(true);
    async function remove() {
      const realm = await getRealm()

      realm.write(() => {
        const workspace = realm.objects('Workspace').find(row => row.name === name)
        const registers = realm.objects('Register').filter(row => row.workspace_name === name)
        const subRegisters = realm.objects('RegisterSubMission')
        const workspaceMissions = realm.objects('WorkspaceMission').filter(row => row.workspace === name)
        let subRegistersDelete = []

        registers.forEach(register => {
          const allSubRegisters = subRegisters.filter(sR => sR.register_id === register.id)
          allSubRegisters.forEach(sR => subRegistersDelete.push(sR))
        })
        realm.delete(workspace)
        realm.delete(workspaceMissions)
        realm.delete(registers)
        realm.delete(subRegistersDelete)
      })

      const newData = data?.filter(dt => dt.name !== name);

      AsyncStorage.getItem('@WorkspaceActual').then((response) => {
        if(response === name) {
          AsyncStorage.setItem('@WorkspaceActual', newData[0] !== undefined ? newData[0].name : '')
          navigate.navigate('Loading')
        }
      })

      setData(newData)
    }
    Alert.alert(
      'Deseja realmente deletar o Workspace?',
      'Você irá perder todos os dados dele.',
      [
        {
          text: 'Sim',
          onPress: () => remove()
        },
        {
          text: 'Não',
          onPress: () => setRemove(false)
        }
      ]
    )
  }

  return (
    <>
      <StatusBar backgroundColor={isDrawerOpen ? '#FFF' : '#FB8C00'} />
      <Title>WorkSpaces</Title>
      <Container>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {data &&
            data.map((workspace: Data) => (
              <RectButton key={workspace.name} onPress={() => handleWorkspace(workspace.name)}>
                <Card>
                  <TopCard>
                    <TitleWorkspace>{workspace.name}</TitleWorkspace>
                    <MaterialIcons
                      name="delete-forever"
                      size={28}
                      color={`${Colors.clear}`}
                      onPress={() => deleteWorkspace(workspace.name)}
                    />
                  </TopCard>

                  <BottomCard>
                    <Text>Total: {workspace.qtd}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text>Média: </Text>
                      <Text color={workspace.media > 60 ? Colors.green : Colors.red} weight="Bold">
                        {rounding(workspace.media, 3)}%
                      </Text>
                    </View>
                  </BottomCard>
                </Card>
              </RectButton>
            ))}

          <MaterialIcons
            name="add-circle-outline"
            size={36}
            color={Colors.black}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('CreationWorkspace');
            }}
            style={{
              alignSelf: 'center',
              marginTop: 16,
            }}
          />
        </ScrollView>
      </Container>
      <Credits>
        <Title>Créditos</Title>
        <CreditsRedes>
          <ContainerCredits onPress={() => openInstagram()}>
            <Feather name="instagram" size={24} color={Colors.black} />
            <TextCredits>@anthnioneves</TextCredits>
          </ContainerCredits>
          <ContainerCredits onPress={() => openGithub()}>
            <Feather name="github" size={24} color={Colors.black} />
            <TextCredits>/AntonioNvs</TextCredits>
          </ContainerCredits>
        </CreditsRedes>
      </Credits>
    </>
  );
};

export default DashoboardDrawer;
