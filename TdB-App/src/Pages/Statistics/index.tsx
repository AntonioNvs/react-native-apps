import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import getRealm from '../../services/realm';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import RNFetchBlob from 'rn-fetch-blob';

import {
  Title,
  SubTitle,
  InformationContainer,
  InformationTextContainer,
  TextInform,
  TextData,
  TitleInformation,
  ButtonDataMissions,
  TextButtonData,
  GraphicContainer,
  TitleGraphic,
  FinallyContainer,
  ButtonAllTestes,
  TextExportCSV,
  TextButtonAllTestes,
  TextExportContainer,
} from './styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Gradient from '../../components/Gradient';
import Header from '../../components/Header';
import Colors from '../../styles/globalColors';
import ViewAnimated from '../../components/ViewAnimated';
import AsyncStorage from '@react-native-community/async-storage';
import { eachDayOfInterval, isAfter, isBefore, subDays, format, isSameDay } from 'date-fns'

import { Workspace } from '../../utils/interfaces'
import { searchNumberRegister } from '../../utils/searchRegister';
import rounding from '../../utils/rounding';

const Statistics: React.FC = () => {
  const screenWidth = Dimensions.get('window').width;

  const [load, setLoad] = useState(false)
  const [dataWorkspace, setDataWorkspace] = useState({})

  const [dataInformation, setDataInformation] = useState({
    time: {
      best: 0,
      media: 0,
      coefVariation: 0,
      standardDeviation: 0,
    },
    pontuation: {
      best: 0,
      mediaPoints: 0,
      mediaPercentage: 0,
      coefVariation: 0,
      standardDeviation: 0,
    },
    allTests: 0,
    frequency: 0,
  })

  const chartConfig = {
    backgroundGradientFrom: `${Colors.background}`,
    backgroundGradientTo: `${Colors.background}`,
    color: () => `${Colors.gray}`,
    barPercentage: 0.51,
    propsForBackgroundLines: undefined,
  };

  const [data, setData] = useState({
    labels: [''],
    datasets: [
      {
        data: [0],
      },
    ],
  });

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('@WorkspaceActual').then(response => {
      async function loadData() {
        const realm = await getRealm()

        // Salvando os dados do workspace
        const workspace = realm.objects('Workspace').find((row: Workspace) => row.name === response)

        setDataWorkspace(workspace)

        // Salvando os dados estatísticos
        const { allTests, frequency } = await searchNumberRegister(String(response))

        const registers = realm.objects('Register').filter(row => row.workspace_name === response)

        let time = {
          sum: 0,
          best: 99999,
          media: 0,
          coefVariation: 0,
          standardDeviation: 0,
        }

        let pontuation = {
          sum: 0,
          best: 0,
          mediaPoints: 0,
          mediaPercentage: 0,
          coefVariation: 0,
          standardDeviation: 0,
        }

        let timeSize = 0;
        let firstRegisterDate = new Date();
        registers.forEach(register => {
          // Melhor tempo
          if(time.best > register.time && register.time !== 0)
            time.best = register.time
          
          // Melhor pontuação
          if(pontuation.best < register.pontuation)
            pontuation.best = register.pontuation
          
          // Somatório dos dados
          time.sum += register.time
          pontuation.sum += register.pontuation

          // Se o tempo for diferente de 0, acrescenta 1 na variável de tempo
          if(register.time !== 0) timeSize++;

          if(isBefore(register.date, firstRegisterDate))
            firstRegisterDate = register.date
        });

        // Definindo o gráfico
        let days = eachDayOfInterval({
          start: firstRegisterDate,
          end: new Date(),
        });
            
        // Dados do gráfico
        let labels: string[] = [];
        let dateNumbers: number[] = [0];
  
        const daysAfterSub90Days = days.filter(day => isAfter(day, subDays(new Date(), 90)));
        const registersAfterSub90Days = registers.filter(register => isAfter(register.date, subDays(new Date(), 90)))
        const sizeDays = daysAfterSub90Days.length;

        if(sizeDays >= 6) {
          let space = Math.round(sizeDays / 5);
          labels.push(format(daysAfterSub90Days[0], 'dd/MM'));

          for(let i = space; i < sizeDays-1; i += space)
            labels.push(format(daysAfterSub90Days[i], 'dd/MM'))
          
          labels.push(format(daysAfterSub90Days[sizeDays-1], 'dd/MM'));
  
        } else {
          labels = daysAfterSub90Days.map(day => format(day, 'dd/MM'))
        }
  
        dateNumbers = daysAfterSub90Days.map(day => {
          return registersAfterSub90Days.filter(register => isSameDay(day, register.date)).length
        })
  
        setData({
          labels,
          datasets: [{
            data: dateNumbers,
          }]
        })

        // Cálculo de valores básicos
        const size = registers.length;

        time.media = rounding(time.sum / timeSize, 3)

        pontuation.mediaPoints = rounding(pontuation.sum / size, 3)
        pontuation.mediaPercentage = rounding((pontuation.mediaPoints / pontuation.best) * 100, 3)

        // Cálculo do somatório do desvio padrão
        time.sum = 0;
        pontuation.sum = 0;
        registers.forEach(register => {
          if(register.time !== 0)
            time.sum += Math.pow(register.time - time.media, 2)
          pontuation.sum += Math.pow((register.pontuation / pontuation.best) - (pontuation.mediaPercentage / 100), 2)
        })

        // Desvio padrão
        pontuation.standardDeviation = rounding(Math.sqrt((pontuation.sum / size)) * 100, 3)
        time.standardDeviation = rounding(Math.sqrt((time.sum / size)), 3)

        // Coeficiente de variação
        pontuation.coefVariation = rounding(pontuation.standardDeviation * 100 / pontuation.mediaPercentage, 3)
        time.coefVariation = rounding((time.standardDeviation / (time.best / time.media)), 3)

        setDataInformation({
          allTests,
          frequency,
          time,
          pontuation,
        })
      }

      loadData()
    })

    navigation.addListener('focus', () => setLoad(false));
    navigation.addListener('blur', () => {
      setLoad(true)
      return;
    });
  }, [load])

  function handleNavigateToAllTestes() {
    navigation.navigate('AllTestes');
  }

  function handleNavigateToByMission() {
    navigation.navigate('ByMission');
  }

  async function createCSV() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const realm = await getRealm()

      const registers = realm.objects('Register').filter(row => row.workspace_name === dataWorkspace.name)

      // Criando o conteúdo
      const headerString = 'id,pontuação,tempo,data\n';
      const content = registers.map(register => `${register.id},${register.pontuation},${register.time},${format(register.date, 'dd/MM/yyyy')}\n`).join('')
      const csvString = `${headerString}${content}`;

      const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/${dataWorkspace.name}.csv`;

      RNFetchBlob.fs.writeFile(pathToWrite, csvString, 'utf8').then(() => {
        Alert.alert(`Arquivo escrito com sucesso!`, 'Localizado na pasta de Downloads!')
      }).catch(err => console.log(err))
    }
  }

  return (
    <Gradient>
      <Header initial={false} />
      <ViewAnimated bottom={-12} alignItems="center">
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Title>{dataWorkspace.name}</Title>
          <SubTitle>
            {dataInformation.pontuation.best}pts /{' '}
            {dataInformation.time.best !== 99999? dataInformation.time.best : 0}s</SubTitle>
          
          <InformationContainer>
            <InformationTextContainer>
              <TextInform>Número de testes</TextInform>
              <TextData color={Colors.gray}>{dataInformation.allTests}</TextData>
            </InformationTextContainer>

            <InformationTextContainer>
              <TextInform>Frequência</TextInform>
              <TextData color={Colors.gray}>{rounding(dataInformation.frequency, 2)} testes/dia</TextData>
            </InformationTextContainer>
          </InformationContainer>

          <InformationContainer>
            <TitleInformation>Tempo</TitleInformation>

            <InformationTextContainer>
              <TextInform>Média</TextInform>
              <TextData 
                color={(dataInformation.time.best / dataInformation.time.media > 0.6) ? Colors.green : Colors.red}>
                {dataInformation.time.media ? dataInformation.time.media : 0}s</TextData>
            </InformationTextContainer>

            <InformationTextContainer>
              <TextInform>Coeficiente de variação</TextInform>
              <TextData 
                color={Colors.greenDark}>
                {dataInformation.time.coefVariation ? dataInformation.time.coefVariation : 0}s</TextData>
            </InformationTextContainer>

            <InformationTextContainer>
              <TextInform>Desvio Padrão</TextInform>
              <TextData color={Colors.greenDark}>{dataInformation.time.standardDeviation}s</TextData>
            </InformationTextContainer>
          </InformationContainer>

          <InformationContainer>
            <TitleInformation>Pontuação (total)</TitleInformation>

            <InformationTextContainer>
              <TextInform>Média Aritmética (%)</TextInform>
              <TextData color={(dataInformation.pontuation.mediaPercentage > 60.0) ? Colors.green : Colors.red}>
                {dataInformation.pontuation.mediaPercentage ? dataInformation.pontuation.mediaPercentage : '???'}%
              </TextData>
            </InformationTextContainer>

            <InformationTextContainer>
              <TextInform>Média Aritmética (pts)</TextInform>
              <TextData color={(dataInformation.pontuation.mediaPercentage > 60.0) ? Colors.green : Colors.red}>
                {dataInformation.pontuation.mediaPoints}pts
              </TextData>
            </InformationTextContainer>

            <InformationTextContainer>
              <TextInform>Desvio Padrão</TextInform>
              <TextData color={(dataInformation.pontuation.standardDeviation < 10.0) ? Colors.green : Colors.red}>
                {dataInformation.pontuation.standardDeviation ? dataInformation.pontuation.standardDeviation : '???'}%
              </TextData>
            </InformationTextContainer>

            <InformationTextContainer>
              <TextInform>Coeficiente de variação</TextInform>
              <TextData color={(dataInformation.pontuation.coefVariation < 10.0) ? Colors.green : Colors.red}>
                {dataInformation.pontuation.coefVariation ? dataInformation.pontuation.coefVariation : '???'}%
              </TextData>
            </InformationTextContainer>
          </InformationContainer>
          <ButtonDataMissions onPress={handleNavigateToByMission}>
            <TextButtonData>Dados por missão!</TextButtonData>
          </ButtonDataMissions>

          <GraphicContainer>
            <TitleGraphic>Acompanhe sua rotina</TitleGraphic>
            <LineChart
              style={{ marginTop: 20 }}
              withHorizontalLines={false}
              withVerticalLines={false}
              data={data}
              width={Math.round(screenWidth - 88)}
              height={220}
              chartConfig={chartConfig}
            />
          </GraphicContainer>

          <FinallyContainer>
            <TextExportContainer onPress={createCSV}>
              <MaterialIcons
                name="attach-file"
                size={24}
                color={Colors.black}
              />
              <TextExportCSV>Exportar dados em CSV</TextExportCSV>
            </TextExportContainer>
            <ButtonAllTestes onPress={handleNavigateToAllTestes}>
              <TextButtonAllTestes>Ver todos os testes!</TextButtonAllTestes>
            </ButtonAllTestes>
          </FinallyContainer>
        </ScrollView>
      </ViewAnimated>
    </Gradient>
  );
};

export default Statistics;
