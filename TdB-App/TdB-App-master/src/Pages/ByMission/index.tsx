import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import getRealm from '../../services/realm';
import rounding from '../../utils/rounding';

import {
  InformationContainer,
  TitleInformation,
  SubTitleInformation,
  ContainerMission,
  TitleMission,
  ContainerDataMission,
  TextInformation,
  TitleSubMission,
} from './styles';

import Gradient from '../../components/Gradient';
import Header from '../../components/Header';
import Colors from '../../styles/globalColors';
import ViewAnimated from '../../components/ViewAnimated';

const ByMission: React.FC = () => {
  const navigation = useNavigation();

  const [dataMissions, setDataMissions] = useState([])
  const [subMissionsDescriptions, setSubMissionsDescriptions] = useState({})
  const [load, setLoad] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@WorkspaceActual').then(response => {
      if(response) {
        async function loadData() {
          const realm = await getRealm()

          // Valores dos registros, das missões, submissões cadastradas e missões relacionadas ao workspace
          const registers = realm.objects('Register').filter(row => row.workspace_name === response)
          const missions = realm.objects('Mission')
          const subMissions = realm.objects('SubMission')
          const workspaceMissions = realm.objects('WorkspaceMission').filter(row => row.workspace === response)
          const registersSubMissions = realm.objects('RegisterSubMission')

          // Relacionando o id da subMissão com sua descrição, para visualização posterior
          let sMD = {}
          subMissions.forEach(subMission => {
            let description: String = subMission.description;

            description = description.replace('\n', '');
            sMD.[subMission.id] = description;
          })
          setSubMissionsDescriptions(sMD);

          const missionsData = {}
          // Descobrindo as missões relacionadas ao workspace
          let missionsOfWorkspace: String[] = []
          workspaceMissions.forEach(wM => missionsOfWorkspace.push(wM.mission))

          // Inicializando o objeto para cada missão
          missions.forEach(mission => {
            const nameMission = mission.name
            if(missionsOfWorkspace.find(MoW => MoW === nameMission)) {
              missionsData.[nameMission] = {}
              missionsData.[nameMission].subMissions = {}
            }
          })

          subMissions.forEach(subMission => {
            const nameMission = subMission.mission_name
            if(missionsOfWorkspace.find(MoW => MoW === nameMission))
              missionsData.[nameMission].subMissions.[subMission.id] = {}
          })
          
          // Descobrindo as estatísticas
          for(let mission in missionsData) {
            let size = 0;
            for(let subMissionId in missionsData.[mission].subMissions) {
              // Descobrindo quais são os registros relacionados
              const registersWithSubMission = registersSubMissions.filter(rS => {
                return Number(subMissionId) === rS.subMission_id && registers.find(row => row.id === rS.register_id)
              })

              const registersSize = registersWithSubMission.length

              // Realizando a média
              let sum = registersWithSubMission.reduce((acc, crrV) => acc + crrV.pontuation, 0);

              // Descobrindo a maior pontuação
              let best = 0;
              registersWithSubMission.forEach(rWS => {
                if(rWS.pontuation > best)
                  best = rWS.pontuation
              })

              // Média
              const media = rounding((sum / registersSize) / best, 5)
              
              // Desvio padrão
              sum = 0;
              for(let rWS of registersWithSubMission)
                sum += Math.pow((rWS.pontuation / best) - media, 2)
              
              const standardDeviation = rounding(Math.sqrt(sum / registersSize), 5)
              const coefVariation = rounding(standardDeviation / media, 5)
              
              // Salvando os dados
              missionsData.[mission].subMissions.[subMissionId] = {
                media: media * 100,
                standardDeviation: standardDeviation * 100,
                coefVariation: coefVariation * 100
              }
              size++;
            }
            missionsData.[mission].size = size;

            // Se tiver mais de uma submissão, é feito os dados da missão em geral
            if(size > 1) {
              // Achando todos os registros em que a submissão pertence a missão
              const registersWithMission = registersSubMissions.filter(rS => {
                const resultSearch = subMissions.find(sM => sM.id === rS.subMission_id)
                let hasMissionInSubMission = false
                if(resultSearch) {
                  hasMissionInSubMission = resultSearch.mission_name === mission;
                }
                return hasMissionInSubMission && registers.find(row => row.id === rS.register_id)
              })

              let sBYI: Object[] = [] // separateByID
              // Separando os dados
              registersWithMission.forEach(rWM => {
                // Caso não tenha criado nenhum objeto, crie um vazio
                const alreadyHas = sBYI.find(rS => rS.id === rWM.register_id);
                if(!alreadyHas) {
                  sBYI.push({
                    id: rWM.register_id,
                    sum: rWM.pontuation,
                  })
                } else {
                  const index = sBYI.indexOf(alreadyHas);
                  sBYI[index].sum += rWM.pontuation
                }
              })

              // Achando o melhor
              let best = 0;
              sBYI.forEach(rS => {
                if(rS.sum > best)
                  best = rS.sum
              })

              // Soma total
              let sum = sBYI.reduce((acc, crrV) => acc + crrV.sum, 0)
              const registersSize = sBYI.length

              // Média
              const media = rounding((sum / registersSize) / best, 5)

              // Desvio padrão
              sum = 0;
              for(let rWS of sBYI) {
                sum += Math.pow((rWS.sum / best) - media, 2)
              }
              
              const standardDeviation = rounding(Math.sqrt(sum / registersSize), 5)
              const coefVariation = rounding(standardDeviation / media, 5)

              missionsData.[mission].media = media * 100;
              missionsData.[mission].standardDeviation = standardDeviation * 100;
              missionsData.[mission].coefVariation = coefVariation * 100;
            }
          }

          let arr = []
          for(let i in missionsData)
            arr.push({
              ...missionsData.[i],
              title: i,
            })
          
          setDataMissions(arr)
        }

        loadData()

      } else {
        console.log("No workspace has been saved")
      }
    })

    navigation.addListener('focus', () => setLoad(false));
    navigation.addListener('blur', () => {
      setLoad(true)
      return;
    });
  }, [load])

  return (
    <Gradient>
      <Header initial={false} />
      <ViewAnimated>
        <InformationContainer>
          <TitleInformation>Ordem dos dados:</TitleInformation>
          <SubTitleInformation>1º Média</SubTitleInformation>
          <SubTitleInformation>2º Coeficiente de variação</SubTitleInformation>
          <SubTitleInformation>3º Desvio padrão</SubTitleInformation>
        </InformationContainer>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        > 
            {dataMissions && dataMissions.map(dataMission => {
              // Se apresentar mais de uma submissão, mostre as estatísticas delas também
              if(dataMission.size > 1) {
                // Criando os componentes de subMissão para visualização posterior
                let componentsSubMissions = [];
                for(let subMission in dataMission.subMissions) {
                  componentsSubMissions.push((
                    <React.Fragment key={subMissionsDescriptions.[subMission]}>
                    <TitleSubMission>
                      {`${subMissionsDescriptions.[subMission].substr(0, 50)}${subMissionsDescriptions.[subMission].length > 50 ? '..' : ''}`}
                    </TitleSubMission>
                    <ContainerDataMission>
                      <TextInformation textAlign="left" color={dataMission.subMissions.[subMission].media > 60.0 ? Colors.green : Colors.red}>
                        {dataMission.subMissions.[subMission].media ? rounding(dataMission.subMissions.[subMission].media, 3) : '???'}%
                      </TextInformation>
                      <TextInformation textAlign="center" color={dataMission.subMissions.[subMission].coefVariation < 10.0 ? Colors.green : Colors.red}>
                        {dataMission.subMissions.[subMission].coefVariation ? rounding(dataMission.subMissions.[subMission].coefVariation, 3) : '???'}%
                      </TextInformation>
                      <TextInformation textAlign="right" color={dataMission.subMissions.[subMission].standardDeviation < 10.0 ? Colors.green : Colors.red}>
                        {dataMission.subMissions.[subMission].standardDeviation ? rounding(dataMission.subMissions.[subMission].standardDeviation, 3) : '???'}%
                      </TextInformation>
                    </ContainerDataMission>
                  </React.Fragment>
                  ))
                }

                // Retornando os elementos em tela
                return (
                  <ContainerMission key={dataMission.title}>
                    <TitleMission>{dataMission.title}</TitleMission>
                    <ContainerDataMission>
                      <TextInformation textAlign="left" color={dataMission.media > 60.0 ? Colors.green : Colors.red}>
                        {dataMission.media ? rounding(dataMission.media, 3) : '???'}%
                      </TextInformation>
                      <TextInformation textAlign="center" color={dataMission.coefVariation < 10.0 ? Colors.green : Colors.red}>
                        {dataMission.coefVariation ? rounding(dataMission.coefVariation, 3) : '???'}%
                      </TextInformation>
                      <TextInformation textAlign="right" color={dataMission.standardDeviation < 10.0 ? Colors.green : Colors.red}>
                        {(dataMission.standardDeviation) ? rounding(dataMission.standardDeviation, 3) : '???'}%
                      </TextInformation>
                    </ContainerDataMission>
                    
                    {
                      componentsSubMissions.map(Component => {
                        return Component
                      })
                    }
                  </ContainerMission>
                )
              } 
              // Caso não tenha mais de uma submissão, apresente somente a estatística geral
              else {
                let id = '';
                for(let i in dataMission.subMissions) {
                  id = i;
                }
                return (
                  <ContainerMission key={dataMission.title}>
                    <TitleMission>{dataMission.title}</TitleMission>
                    <ContainerDataMission>
                    <TextInformation textAlign="left" color={dataMission.subMissions.[id].media > 60.0 ? Colors.green : Colors.red}>
                      {dataMission.subMissions.[id].media ? rounding(dataMission.subMissions.[id].media, 3) : '???'}%
                    </TextInformation>
                    <TextInformation textAlign="center" color={dataMission.subMissions.[id].coefVariation < 10.0 ? Colors.green : Colors.red}>
                      {dataMission.subMissions.[id].coefVariation ? rounding(dataMission.subMissions.[id].coefVariation, 3) : '???'}%
                    </TextInformation>
                    <TextInformation textAlign="right" color={dataMission.subMissions.[id].standardDeviation < 10.0 ? Colors.green : Colors.red}>
                      {dataMission.subMissions.[id].standardDeviation ? rounding(dataMission.subMissions.[id].standardDeviation, 3) : '???'}%
                    </TextInformation>
                    </ContainerDataMission>
                  </ContainerMission>
                )
              }
                
            })}
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

export default ByMission;
