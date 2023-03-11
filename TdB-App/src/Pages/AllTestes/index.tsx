import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import getRealm from '../../services/realm';
import { format } from 'date-fns'

import ViewAnimated from '../../components/ViewAnimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Gradient from '../../components/Gradient';
import {
  NumberTotalText,
  Card,
  TitleCard,
  CardMissionContainer,
  TextMission,
  TextMissionContainer,
  CardTopContainer,
} from './styles';
import Header from '../../components/Header';
import Colors from '../../styles/globalColors';

interface RegisterData {
  id: number;
  pontuation: number;
  time: number;
  date: Date;
  missions: {
    title: string;
    pontuation: number;
  }[];
}

const AllTestes: React.FC = () => {
  const navigation = useNavigation();

  const [allTests, setAllTests] = useState(0)
  const [update, setUpdate] = useState(false)
  const [data, setData] = useState<RegisterData[]>();
  const [load, setLoad] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('@WorkspaceActual').then(response => {
      if(response) {
        async function loadData() {
          const realm = await getRealm()

          const registers = realm.objects('Register').filter(row => row.workspace_name === response)
          const subMissionsRegisters = realm.objects('RegisterSubMission');
          const subMissions = realm.objects('SubMission');

          // Números de registros
          setAllTests(registers.length)

          let createData: RegisterData[] = []

          registers.forEach(register => {
            let missions: Object[] = [];

            const registersWithAMissions = subMissionsRegisters.filter(row => row.register_id === register.id)

            registersWithAMissions.forEach(rWM => {
              const sM = subMissions.find(sM => sM.id === rWM.subMission_id)
              const hasMission = missions.find(m => m.title === sM.mission_name)

              if(hasMission) {
                const index = missions.indexOf(hasMission);

                missions[index].pontuation += rWM.pontuation;
              } else {
                missions.push({
                  title: sM.mission_name,
                  pontuation: rWM.pontuation,
                });
              }
            })

            createData.push({
              id: register.id,
              pontuation: register.pontuation,
              time: register.time,
              date: register.date,
              missions,
            })
          })

          setData(createData)
        }

        loadData()
      }
    })
    
    navigation.addListener('focus', () => setLoad(false));
    navigation.addListener('blur', () => {
      setLoad(true)
      return;
    });
  }, [load, update])

  function deleteRegister(id: number) {
    async function remove() {
      const realm = await getRealm()

      realm.write(() => {
        const register = realm.objects('Register').find(row => row.id === id)

        realm.delete(register);
      })
      
      setUpdate(!update)
    }

    Alert.alert(
      'Tem certeza que quer excluir o registro?', '',
      [
        {
          text: 'Sim',
          onPress: () => remove()
        },
        {
          text: 'Não',
        }
      ]
    )
  }

  return (
    <Gradient>
      <Header initial={false} />
      <ViewAnimated bottom={-12}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <NumberTotalText>Total de testes: {allTests}</NumberTotalText>
          {
            data && data.map(register => {
              let missions = []
              for(let i = 0; i <= Math.trunc(register.missions.length / 3); i++) {
                missions.push([])
                for(let j = 0; j < 3; j++) {
                  if(3*i + j >= register.missions.length)
                    break;
                  
                  missions[i].push(register.missions[3*i + j])
                }
              }

              return (
                <Card key={register.id}>
                  <CardTopContainer>
                    <View>
                      <TitleCard color={Colors.black}>
                        <TitleCard color={Colors.blue}>{register.time}s</TitleCard>
                        {' - '}
                        <TitleCard color={Colors.primary}>{register.pontuation}pts</TitleCard>
                        {' - '}
                        <TitleCard color={Colors.gray}>{format(register.date, 'dd-MM-yyyy').replace('-', '/').replace('-', '/')}</TitleCard>
                      </TitleCard>
                    </View>
                    <MaterialIcons
                      name="delete-forever"
                      size={28}
                      color={`${Colors.clear}`}
                      onPress={() => deleteRegister(register.id)}
                    />
                  </CardTopContainer>
                  {
                    missions.map((mission, i) => (
                        <CardMissionContainer key={i}>
                          {
                            mission.map((m, i) => {
                              const align = (i == 0) ? 'left' : (i == 1) ? 'center' : 'right' 
                              return (
                              <TextMissionContainer align={align} key={m.title}>
                                <TextMission color={Colors.black}>{`${m.title.substr(0, 11).trim()}${m.title.length > 11 ? '..' : ''}`}</TextMission>
                                <TextMission color={Colors.red} bold>
                                  {m.pontuation}
                                </TextMission>
                              </TextMissionContainer>
                            )})
                          }
                        </CardMissionContainer>
                      )
                    )
                  }
                </Card>
              )
            })
          }
        </ScrollView>
      </ViewAnimated>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  animated: {
    flex: 1,
    backgroundColor: Colors.background,
    marginHorizontal: 16,

    borderRadius: 12,
    bottom: -12,
    padding: 16,
  },

  scrollView: {
    flex: 1,
  },
});

export default AllTestes;
