import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Colors from '../../styles/globalColors';
import { useNavigation } from '@react-navigation/native';
import { isAfter, isBefore, subDays, eachDayOfInterval, format, isSameDay } from 'date-fns'

import Gradient from '../../components/Gradient';
import HeaderInitial from '../../components/Header';
import getRealm from '../../services/realm';

import {
  Title,
  InitialInformationContainer,
  TextContainer,
  TextInform,
  TextData,
  GraphicContainer,
  TitleGraphic,
  FinallyInformationContainer,
} from './styles';

import { Dimensions } from 'react-native';
import ViewAnimated from '../../components/ViewAnimated';
import rounding from '../../utils/rounding';

const screenWidth = Dimensions.get('window').width;

interface Register {
  id: number;
  pontuation: number;
  workspace_name: string;
  time: number;
  time_compare: number;
  date: Date;
}

const DashboardStatistics: React.FC = () => {
  const [load, setLoad] = useState(false)

  const [dataInformation, setDataInformation] = useState({
    numberWorkspace: 0,
    frequency: 0,
    bestMedia: {
      name: '',
      media: 0,
    },
    moreTest: {
      name: '',
      tests: 0,
    },
    allTests: 0,
    lastWeek: 0,
  });
  
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

  const navigation = useNavigation()

  useEffect(() => {
    async function data() {
      let saveDate = {
        numberWorkspace: 0,
        frequency: 0,
        bestMedia: {
          name: '',
          media: 0,
        },
        moreTest: {
          name: '',
          tests: 0,
        },
        allTests: 0,
        lastWeek: 0,
      }
      const realm = await getRealm()

      const workspaces = realm.objects('Workspace')

      // Número de workspaces
      saveDate.numberWorkspace = workspaces.length

      const registers = realm.objects('Register');

      saveDate.allTests = registers.length
      let firstRegisterDate = new Date();
      let tests = {}
      let media = {}

      registers.forEach((register: Register) => {
        if(isBefore(register.date, firstRegisterDate))
          firstRegisterDate = register.date

        const nameWorkspace = register.workspace_name;
        // More tests
        if(tests.[nameWorkspace])
          tests.[nameWorkspace]++
        else
          tests.[nameWorkspace] = 1;

        // Media Tests
        const pont = register.pontuation;
        if(media.[nameWorkspace]) {
          media.[nameWorkspace].media += pont;
          media.[nameWorkspace].best = (pont > media.[nameWorkspace].best) ? pont : media.[nameWorkspace].best
        }
        else {
          media.[nameWorkspace] = {
            media: pont,
            best: pont
          }
        }
        
        // última semana
        if(isAfter(register.date, subDays(new Date(), 7)))
          saveDate.lastWeek ++;
      })

      let days = eachDayOfInterval({
        start: firstRegisterDate,
        end: new Date(),
      });

      const daysSinceTheFirstRegister = days.length;

      saveDate.frequency = rounding(registers.length / daysSinceTheFirstRegister, 2);
      
      // Dados do gráfico
      let labels: string[] = [];
      let dateNumbers: number[] = [0];

      const daysAfterSub90Days = days.filter(day => isAfter(day, subDays(new Date(), 90)));
      const registersAfterSub90Days = registers.filter(register => isAfter(register.date, subDays(new Date(), 90)))
      const size = daysAfterSub90Days.length;

      if(size >= 6) {
        let space = Math.round(size / 5);
        labels.push(format(daysAfterSub90Days[0], 'dd/MM'));
        
        for(let i = space; i < size-1; i += space)
          labels.push(format(daysAfterSub90Days[i], 'dd/MM'))
        
        labels.push(format(daysAfterSub90Days[size-1], 'dd/MM'));

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

      // Selecionando a melhor média
      for(let works in media) {
        media.[works].media = (media.[works].media / tests.[works]) / media.[works].best
      }

      for(let works in media) {
        if(media.[works].media > saveDate.bestMedia.media) {
          saveDate.bestMedia.media = media.[works].media
          saveDate.bestMedia.name = works
        }
      }

      for(let works in tests) {
        if(tests.[works] > saveDate.moreTest.tests) {
          saveDate.moreTest.tests = tests.[works]
          saveDate.moreTest.name = works 
        }
      }
      setDataInformation(saveDate)
    }

    data()

    navigation.addListener('focus', () => setLoad(false))
    navigation.addListener('blur', () => setLoad(true));

  }, [load])

  return (
    <Gradient>
      <HeaderInitial initial />
      <ViewAnimated bottom={-12} alignItems="center">
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <Title>Estatísticas Gerais</Title>
          <InitialInformationContainer>
            <TextContainer>
              <TextInform>Número de WorkSpaces</TextInform>
              <TextData alignment="right">{dataInformation.numberWorkspace}</TextData>
            </TextContainer>

            <TextContainer>
              <TextInform>Frequência</TextInform>
              <TextData alignment="right">{dataInformation.frequency} testes/dia</TextData>
            </TextContainer>

            <TextContainer>
              <TextInform>Melhor Média</TextInform>
              <View style={{ flexDirection: 'row' }}>
                <TextData alignment="right" color={`${Colors.clear}`}>
                  {dataInformation.bestMedia.name.substr(0, 13)}{'  '}
                </TextData>
                <TextData
                  alignment="right"
                  color={`${dataInformation.bestMedia.media > 0.6 ? Colors.green : Colors.red}`}
                  weight="Bold"
                >
                  {rounding(dataInformation.bestMedia.media*100, 3)}%
                </TextData>
              </View>
            </TextContainer>

            <TextContainer>
              <TextInform>Mais Testado</TextInform>
              <View style={{ flexDirection: 'row' }}>
                <TextData alignment="right" color={`${Colors.clear}`}>
                  {dataInformation.moreTest.name.substr(0, 10)} -{' '}
                </TextData>
                <TextData
                  alignment="right"
                  color={`${Colors.black}`}
                  weight="Bold"
                >
                  {dataInformation.moreTest.tests}
                </TextData>
              </View>
            </TextContainer>
          </InitialInformationContainer>

          <GraphicContainer>
            <TitleGraphic>Acompanhe sua rotina</TitleGraphic>
            {
              data.labels && (
                <LineChart
                  style={{ marginTop: 20 }}
                  withHorizontalLines={false}
                  withVerticalLines={false}
                  data={data}
                  width={Math.round(screenWidth - 72)}
                  height={220}
                  chartConfig={chartConfig}
                />
              )
            }
            
          </GraphicContainer>

          <FinallyInformationContainer>
            <View>
              <TextInform>Total de testes</TextInform>
              <TextData alignment="center">{dataInformation.allTests}</TextData>
            </View>
            <View>
              <TextInform>Últimos 7 dias</TextInform>
              <TextData alignment="center">{dataInformation.lastWeek}</TextData>
            </View>
          </FinallyInformationContainer>
        </ScrollView>
      </ViewAnimated>
    </Gradient>
  );
};

export default DashboardStatistics;
