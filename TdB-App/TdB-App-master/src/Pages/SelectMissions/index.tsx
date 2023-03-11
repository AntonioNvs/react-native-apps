import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Gradient from '../../components/Gradient';
import Header from '../../components/Header';
import { ScrollView } from 'react-native';
import Colors from '../../styles/globalColors';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Title,
  SubTitleContainer,
  SubTitle,
  CardContainer,
  CardView,
  Card,
  NumberContainer,
  NumberTextMission,
  ImageMission,
  TitleMission,
  TitleMissionContainer,
  ButtonConfirm,
  TextButton,
} from './styles';

import Inspecao from '../../../assets/images/inspecao.png';
import Inovacao from '../../../assets/images/inovacao.png';
import Contador from '../../../assets/images/contadorPassos.png';
import Escorregador from '../../../assets/images/escorregador.png';
import Banco from '../../../assets/images/banco.png';
import Basquetebol from '../../../assets/images/basquetebol.png';
import BarraFixa from '../../../assets/images/barraFixa.png';
import DancaRobo from '../../../assets/images/dancaRobo.png';
import Bocha from '../../../assets/images/bocha.png';
import TombamentoPneu from '../../../assets/images/tombamentoPneu.png';
import Celular from '../../../assets/images/celular.png';
import Esteira from '../../../assets/images/esteira.png';
import MaquinaRemo from '../../../assets/images/maquinaRemo.png';
import Ginastica from '../../../assets/images/ginastica.png';
import UnidadesSaude from '../../../assets/images/unidadesSaude.png';
import Precisao from '../../../assets/images/precisao.png';
import ViewAnimated from '../../components/ViewAnimated';

const SelectMissions: React.FC = () => {
  const [totalSelected, setTotalSelected] = useState(0);
  const [load, setLoad] = useState(false);

  const navigation = useNavigation();

  const [Missions, setMissions] = useState([
    [
      {
        number: 0,
        select: false,
        image: Inspecao,
        title: 'Bônus de Inspeção de Equipamentos',
      },
      {
        number: 1,
        select: false,
        image: Inovacao,
        title: 'Projeto de Inovação',
      },
    ],
    [
      {
        number: 2,
        select: false,
        image: Contador,
        title: 'Contador de Passos',
      },
      {
        number: 3,
        select: false,
        image: Escorregador,
        title: 'Escorregador',
      },
    ],
    [
      {
        number: 4,
        select: false,
        image: Banco,
        title: 'Banco',
      },
      {
        number: 5,
        select: false,
        image: Basquetebol,
        title: 'Basquetebol',
      },
    ],
    [
      {
        number: 6,
        select: false,
        image: BarraFixa,
        title: 'Barra Fixa',
      },
      {
        number: 7,
        select: false,
        image: DancaRobo,
        title: 'Dança do robô',
      },
    ],
    [
      {
        number: 8,
        select: false,
        image: Bocha,
        title: 'Bocha',
      },
      {
        number: 9,
        select: false,
        image: TombamentoPneu,
        title: 'Tombamento de Pneu',
      },
    ],
    [
      {
        number: 10,
        select: false,
        image: Celular,
        title: 'Telefone Celular',
      },
      {
        number: 11,
        select: false,
        image: Esteira,
        title: 'Esteira',
      },
    ],
    [
      {
        number: 12,
        select: false,
        image: MaquinaRemo,
        title: 'Máquina de Remo',
      },
      {
        number: 13,
        image: Ginastica,
        title: 'Aparelho de ginástica',
      },
    ],
    [
      {
        number: 14,
        select: false,
        image: UnidadesSaude,
        title: 'Unidades de Saúde',
      },
      {
        number: 15,
        select: false,
        image: Precisao,
        title: 'Precisão',
      },
    ],
  ]);

  // Para efeitos de UX, se já tiver selecionado algumas missões guardadas no AsyncStorage,
  // é modificado o array de acordo
  useEffect(() => {
    // Toda vez que sair da tela ou voltar, recarregue esse useEffect
    navigation.addListener('focus', () => setLoad(false));
    navigation.addListener('blur', () => {
      setLoad(true)
      return;
    });

    AsyncStorage.getItem('@MissionsSelected').then(response => {
      if(response) {
        const missionsSelected = response.split(';');
        // Percorrendo todas as missões
        const newMissions = Missions.map(missions => {
          const first = missions[0];
          const second = missions[1];

          // Percorrendo as missões já guardadas (first)
          const hasFirst = missionsSelected.find(mission => {
            if(first.title === mission)
              return true
            else
              return false
          })
          
          // Percorrendo as missões já guardadas (second)
          const hasSecond = missionsSelected.find(mission => {
            if(second.title === mission)
              return true
            else
              return false
          })

          if(hasFirst && hasSecond)
            return [{ ...first, select: true }, {...second, select: true}];

          if(hasFirst) 
            return [{ ...first, select: true }, second];

          if(hasSecond) 
            return [first, { ...second, select: true }];
          
          return [first, second];
        })
        
        setMissions(newMissions)
        setTotalSelected(missionsSelected.length)
      }
    })

  }, [load])

  function handleSelect(id: number) {
    const newMissions = Missions.map(missions => {
      const first = missions[0];
      const second = missions[1];

      if (first.number === id) {
        return [{ ...first, select: !first.select }, second];
      }

      if (second.number === id) {
        return [first, { ...second, select: !second.select }];
      }

      return [first, second];
    });
    setMissions(newMissions);

    const total = newMissions.reduce((sum, missions) => {
      let auxTotal = 0;
      if (missions[0].select) {
        auxTotal += 1;
      }

      if (missions[1].select) {
        auxTotal += 1;
      }
      return sum + auxTotal;
    }, 0);

    setTotalSelected(total);
  }

  function handleGoToCreationWorkspace() {
    var missionsSelected = [];

    // Percorrendo o vetor de missões e todas que tiverem selecionadas,
    // seu título é guardado no array de missões selecionadas
    Missions.map(missions => {
      const first = missions[0];
      const second = missions[1];

      if(first.select) missionsSelected.push(first.title)
      if(second.select) missionsSelected.push(second.title)
    });

    // Guardando as missões selecionadas no AsyncStorage para uso posterior
    AsyncStorage.setItem('@MissionsSelected', missionsSelected.join(';'))

    navigation.goBack();
  }

  return (
    <Gradient>
      <Header initial={false} />
      <ViewAnimated>
        <Title>Selecione as missões desejadas</Title>
        <SubTitleContainer>
          <SubTitle color={Colors.gray}>
            Total selecionadas: {totalSelected}
          </SubTitle>
        </SubTitleContainer>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {Missions.map(missions => (
            <CardContainer key={missions[0].number}>
              <Card onPress={() => handleSelect(missions[0].number)}>
                <NumberContainer select={missions[0].select} side="left">
                  <NumberTextMission>
                    {missions[0].number < 10
                      ? `M0${missions[0].number}`
                      : `M${missions[0].number}`}
                  </NumberTextMission>
                </NumberContainer>
                <CardView select={missions[0].select} align="flex-start">
                  <ImageMission source={missions[0].image} />
                  <TitleMissionContainer>
                    <TitleMission>{missions[0].title}</TitleMission>
                  </TitleMissionContainer>
                </CardView>
              </Card>

              <Card onPress={() => handleSelect(missions[1].number)}>
                <NumberContainer side="right" select={missions[1].select}>
                  <NumberTextMission>
                    {missions[1].number < 10
                      ? `M0${missions[1].number}`
                      : `M${missions[1].number}`}
                  </NumberTextMission>
                </NumberContainer>
                <CardView select={missions[1].select} align="flex-end">
                  <ImageMission source={missions[1].image} />
                  <TitleMissionContainer>
                    <TitleMission>{missions[1].title}</TitleMission>
                  </TitleMissionContainer>
                </CardView>
              </Card>
            </CardContainer>
          ))}
          <ButtonConfirm onPress={handleGoToCreationWorkspace}>
            <TextButton>Tudo Certo!</TextButton>
          </ButtonConfirm>
        </ScrollView>
      </ViewAnimated>
    </Gradient>
  );
};

export default SelectMissions;
