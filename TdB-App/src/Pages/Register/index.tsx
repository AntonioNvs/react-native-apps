import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import getRealm from '../../services/realm';

import Gradient from '../../components/Gradient';
import Header from '../../components/Header';
import Cronometro from '../../components/Cronometro'

import {
  MissionsScrollView,
  ButtonSend,
  BottomContainer,
  TotalPointsText,
  TextButtonSend,
} from './styles';

import Inspecao from '../../components/Missions/Inspecao';
import Inovacao from '../../components/Missions/Inovacao';
import ContadorDePassos from '../../components/Missions/ContadorDePassos';
import Escorregador from '../../components/Missions/Escorregador';
import Banco from '../../components/Missions/Banco';
import Basquetebol from '../../components/Missions/Basquetebol';
import BarraFixa from '../../components/Missions/BarraFixa';
import DancaDoRobo from '../../components/Missions/DancaDoRobo';
import Bocha from '../../components/Missions/Bocha';
import TombamentoDePneu from '../../components/Missions/TombamentoDePneu';
import TelefoneCelular from '../../components/Missions/TelefoneCelular';
import Esteira from '../../components/Missions/Esteira';
import MaquinaDeRemo from '../../components/Missions/MaquinaDeRemo';
import AparelhoDeGinastica from '../../components/Missions/AparelhoDeGinastica';
import UnidadesDeSaude from '../../components/Missions/UnidadesDeSaude';
import Precisao from '../../components/Missions/Precisao';
import Colors from '../../styles/globalColors';
import ViewAnimated from '../../components/ViewAnimated';

import { ChangeMissionsDTO } from '../../components/Missions/interface';
import { Alert, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Register: React.FC = () => {
  const navigation = useNavigation();
  
  const [seconds, setSeconds] = useState(0)
  const [stop, setStop] = useState(true)
  const [pontuationTotal, setPontuationTotal] = useState(0)

  const [dataWorkspace, setDataWorkspace] = useState({});
  const [dataWorkspaceMissions, setDataWorkspaceMission] = useState([]);
  const [haveDoneSomeMissionEnd, setHaveDoneSomeMissionEnd] = useState({
    bar: false,
    dance: false,
  })

  // Lista dos componentes das missões juntamente com os dados
  const missions = [
    {
      component: <Inspecao onPontuationChange={handlePontuationChange}/>,
      title: 'Bônus de Inspeção de Equipamentos',
    },
    {
      component: <Inovacao onPontuationChange={handlePontuationChange}/>,
      title: 'Projeto de Inovação',
    },
    {
      component: <ContadorDePassos onPontuationChange={handlePontuationChange}/>,
      title: 'Contador de Passos',
    },
    {
      component: <Escorregador onPontuationChange={handlePontuationChange}/>,
      title: 'Escorregador',
    },
    {
      component: <Banco onPontuationChange={handlePontuationChange}/>,
      title: 'Banco',
    },
    {
      component: <Basquetebol onPontuationChange={handlePontuationChange}/>,
      title: 'Basquetebol',
    },
    {
      component: <BarraFixa 
        onPontuationChange={handlePontuationChange} 
        haveDoneSomeMissionEnd={haveDoneSomeMissionEnd}
        functionSet={doneSomeMissionEnd}
      />,
      title: 'Barra Fixa',
    },
    {
      component: <DancaDoRobo 
        onPontuationChange={handlePontuationChange} 
        haveDoneSomeMissionEnd={haveDoneSomeMissionEnd}
        functionSet={doneSomeMissionEnd}
      />,
      title: 'Dança do robô',
    },
    {
      component: <Bocha onPontuationChange={handlePontuationChange}/>,
      title: 'Bocha',
    },
    {
      component: <TombamentoDePneu onPontuationChange={handlePontuationChange}/>,
      title: 'Tombamento de Pneu',
    },
    {
      component: <TelefoneCelular onPontuationChange={handlePontuationChange}/>,
      title: 'Telefone Celular',
    },
    {
      component: <Esteira onPontuationChange={handlePontuationChange}/>,
      title: 'Esteira',
    },
    {
      component: <MaquinaDeRemo onPontuationChange={handlePontuationChange}/>,
      title: 'Máquina de Remo',
    },
    {
      component: <AparelhoDeGinastica onPontuationChange={handlePontuationChange}/>,
      title: 'Aparelho de Ginástica',
    },
    {
      component: <UnidadesDeSaude onPontuationChange={handlePontuationChange}/>,
      title: 'Unidades de Saúde',
    },
    {
      component: <Precisao onPontuationChange={handlePontuationChange}/>,
      title: 'Precisão',
    },
  ];

  const [pontuationMissions, setPontuationMissions] = useState([
    {
      pontuation: 0,
      nameMission: 'Bônus de Inspeção de Equipamentos',
    },
    {
      pontuation: 0,
      nameMission: 'Projeto de Inovação',
    },
    {
      pontuation: 0,
      nameMission: 'Contador de Passos',
    },
    {
      pontuation: 0,
      nameMission: 'Escorregador',
      subMissions: [
        {
          number: 0,
          pontuation: 0,
        },
        {
          number: 1,
          pontuation: 0,
        },
        {
          number: 2,
          pontuation: 0,
        },
      ]
    },
    {
      pontuation: 0,
      nameMission: 'Banco',
      subMissions: [
        {
          number: 0,
          pontuation: 0,
        },
        {
          number: 1,
          pontuation: 0,
        },
        {
          number: 2,
          pontuation: 0,
        }
      ]
    },
    {
      pontuation: 0,
      nameMission: 'Basquetebol',
      subMissions: [
        {
          pontuation: 0,
          number: 0,
        },
        {
          pontuation: 0,
          number: 1,
        },
      ]
    },
    {
      pontuation: 0,
      nameMission: 'Barra Fixa',
    },
    {
      pontuation: 0,
      nameMission: 'Dança do robô',
    },
    {
      pontuation: 0,
      nameMission: 'Bocha',
      subMissions: [
        {
          pontuation: 0,
          number: 0,
        },
        {
          pontuation: 0,
          number: 1,
        },
        {
          pontuation: 0,
          number: 2,
        }
      ]
    },
    {
      pontuation: 0,
      nameMission: 'Tombamento de Pneu',
      subMissions: [
        {
          pontuation: 0,
          number: 0,
        },
        {
          pontuation: 0,
          number: 1,
        },
        {
          pontuation: 0,
          number: 2,
        }
      ]
    },
    {
      pontuation: 0,
      nameMission: 'Telefone Celular',
    },
    {
      pontuation: 0,
      nameMission: 'Esteira',
    },
    {
      pontuation: 0,
      nameMission: 'Máquina de Remo',
      subMissions: [
        {
          pontuation: 0,
          number: 0,
        },
        {
          pontuation: 0,
          number: 1,
        }
      ]
    },
    {
      pontuation: 0,
      nameMission: 'Aparelho de Ginástica',
    },
    {
      pontuation: 0,
      nameMission: 'Unidades de Saúde',
      subMissions: [
        {
          pontuation: 0,
          number: 0,
        },
        {
          pontuation: 0,
          number: 1,
        }
      ]
    },
    {
      pontuation: 0,
      nameMission: 'Precisão',
    },
  ]);

  // Setando os estados relacionados ao workspace atual
  useEffect(() => {
    AsyncStorage.getItem('@WorkspaceActual').then(response => {
      if (response) {
        // Se existe algo, então procure no Banco o Workspace
        async function loadData() {
          const realm = await getRealm();

          const workspace = realm
            .objects('Workspace')
            .find(row => row.name === response);
          
          const time = workspace.time ? workspace.time : 0

          setDataWorkspace(workspace ? workspace : {});

          const workspaceMissions = realm
            .objects('WorkspaceMission')
            .filtered(`workspace = "${workspace.name}"`);
          
          setDataWorkspaceMission(workspaceMissions)
        }
        loadData();
      }
    })
  }, [])

  useEffect(() => {
    setPontuationTotal(pontuationMissions.reduce((accumulate, mission) => mission.pontuation + accumulate, 0))
  }, [pontuationMissions])

  function doneSomeMissionEnd(state: boolean, mission: string) {
    setHaveDoneSomeMissionEnd({
      ...haveDoneSomeMissionEnd,
      [mission]: state, 
    })
  }

  // Mudança da pontuação de acordo com qual opção foi ativada
  function handlePontuationChange(missionsChange: ChangeMissionsDTO[]) {
    // Pontuação por missão separada
    setPontuationMissions(pontuationMissions.map(mission => {
      // Definição da variável com valores aleatórios somente para evitar erro do typescript
      const myState = missionsChange.find(mC => {
        if(mC.nameMission === mission.nameMission) 
          return true;
        else
          return false;
      })

      if(myState) {
        if(mission.subMissions) {
          let point = mission.pontuation;
          const newSubMission = mission.subMissions.map(subMission => {
            let sM = subMission
            for(let mC of missionsChange) {
              if(subMission.number === mC.subMission) {
                point += mC.point;
                sM = {...sM, pontuation: sM.pontuation + mC.point};
                break;
              }
            }
            return sM;
          })
          return {...mission, pontuation: point, subMissions: newSubMission}
        } else {
          return {...mission, pontuation: mission.pontuation + missionsChange[0].point}
        }
      }
      return mission
    }));
  }  

  async function handleSend() {
    if(stop) {
      /* pontuationMissions.map(mission => {
        console.log(`${mission.nameMission}: ${mission.pontuation}`)
        if(mission.subMissions) {
          mission.subMissions.map(subMission => {
            console.log(`${mission.nameMission} - ${subMission.number}: ${subMission.pontuation}`)
          })
        }
      }) */

      async function createRegister() {
        const realm = await getRealm();

        // Definindo o id do registro
        const lastIdRegister = realm.objects('Register').sorted('id', true)[0]
        const registerId = (lastIdRegister) ? lastIdRegister.id + 1 : 0 // Caso não exista um registro, coloque o id como 0
        
        // Definindo o id do registo-submission
        const lastIdRegisterSubMission = realm.objects('RegisterSubMission').sorted('id', true)[0]
        let registerSubMissionId = (lastIdRegisterSubMission) ? lastIdRegisterSubMission.id + 1 : 0

        // Criando o registr
        const register = {
          id: registerId,
          pontuation: pontuationTotal,
          workspace_name: dataWorkspace.name,
          time: seconds,
          date: new Date(),
        }
        
        // Criando os dados de subMissão, buscando o id de cada uma correspondente
        const dataSubMissions = realm.objects('SubMission')
        let partRegisterSubMission: Object[] = [];

        pontuationMissions.forEach(mission => {
          const isPresent = dataWorkspaceMissions.find(wM => wM.mission === mission.nameMission);
          if(isPresent) {
            if(mission.subMissions) {
              mission.subMissions.forEach(subMission => {
                const sB = dataSubMissions.find(
                  row => row.mission_name === mission.nameMission && row.number === subMission.number
                )
                sB.pontuation = subMission.pontuation
                partRegisterSubMission.push(sB)
              })
            } 
            else { 
              const subMission = dataSubMissions.find(
                row => row.mission_name === mission.nameMission
              )
              subMission.pontuation = mission.pontuation
              partRegisterSubMission.push(subMission)
            }
          }
        });

        realm.write(() => {
          // Criando registro
          realm.create('Register', {
            id: register.id,
            pontuation: register.pontuation,
            workspace_name: register.workspace_name,
            time: register.time,
            date: register.date
          });

          // Criando cada missão do registro
          for(let registerSubMission of partRegisterSubMission) {
            realm.create('RegisterSubMission', {
              id: registerSubMissionId,
              register_id: register.id,
              subMission_id: registerSubMission.id,
              pontuation: registerSubMission.pontuation
            })
            registerSubMissionId++;
          }
        })

        console.log("OK!")
        navigation.navigate('Workspace')
      }

      Alert.alert("Você quer mesmo fazer o registro?", '', [
        {
          text: 'Sim',
          onPress: () => createRegister()
        },
        {
          text: 'Não'
        }
      ])
    }
    else {
      console.log("Stopwatch is active")
    }
  }

  return (
    <Gradient>
      <Header initial={false} />
      <ViewAnimated bottom={-12} padding={screenWidth > 650 ? 12 : 8}>
        <MissionsScrollView showsVerticalScrollIndicator={false}>          

          <Cronometro 
            onSecondsChange={(sec) => setSeconds(sec)}
            onStopChange={(state) => setStop(state)}
          />

          {missions.map((mission, index) => {
            const workspaceMissions = dataWorkspaceMissions;
            for(let registerWorkspaceMission of workspaceMissions) {
              if(registerWorkspaceMission.mission === mission.title)
                return (
                  <React.Fragment key={index}>
                    {mission.component}
                  </React.Fragment>
                )
            }
          })}
        </MissionsScrollView>
        <BottomContainer>
          <TotalPointsText color={Colors.black}>
            Total de pontos: {' '}
            <TotalPointsText color={Colors.green}>{pontuationTotal}</TotalPointsText>
          </TotalPointsText>
          <ButtonSend onPress={handleSend}>
            <TextButtonSend>Pronto!</TextButtonSend>
          </ButtonSend>
        </BottomContainer>
      </ViewAnimated>
    </Gradient>
  );
};

export default Register;
