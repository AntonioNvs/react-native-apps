import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff, SelectContainer, Count } from '../Components/Select';

import ImageTombamentoDePneu from '../../../../assets/images/tombamentoPneu.png';
import MissionOptions from '../interface';

import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const TombamentoDePneu: React.FC<MissionOptions> = ({ onPontuationChange }) => {
  const [stateMission, setStateMission] = useState({
    first: {
      state: false,
      pontuation: 10,
      subMission: 0,
    },
    second: {
      state: false,
      pontuation: 15,
      subMission: 1,
    },
    add: {
      pontuation: 5,
      subMission: 2,
    }
  });
  const [before, setBefore] = useState(0);
  const [max, setMax] = useState(0);

  const nameMission = "Tombamento de Pneu";

  function handlePneu(option: string) {
    const point = stateMission.[option].pontuation;
    const subMission = stateMission.[option].subMission

    if(stateMission.[option].state) {
      onPontuationChange([{
        point: -point,
        nameMission,
        subMission,
      }])

      setStateMission({...stateMission, [option]: {...stateMission.[option], state: false}})
    } else {
      onPontuationChange([{
        point: point,
        nameMission,
        subMission,
      }])

      setStateMission({...stateMission, [option]: {...stateMission.[option], state: true}})
    }
  }

  function handlePontuationAdd(n: number) {
    onPontuationChange([{
      point: (n-before)*stateMission.add.pontuation,
      nameMission,
      subMission: stateMission.add.subMission
    }])
    setBefore(n)
  }

  useEffect(() => {
    const newMax = Number(stateMission.first.state) + Number(stateMission.second.state);
    if(before > newMax) {
      onPontuationChange([{
        point: (newMax-before)*stateMission.add.pontuation,
        nameMission,
        subMission: stateMission.add.subMission,
      }])
      setBefore(newMax);
    }
    setMax(newMax)
  }, [stateMission])

  return (
    <Container>
      <Title>Tombamento De Pneu</Title>
      <DetailsMissionContainer>
        <Image source={ImageTombamentoDePneu} height={38} width={48} />
        <View>
          <Description maxWidth={screenWidth > 400 ? 200 : 160}>
            • Se o pneu leve (banda azul) estiver com a parte central branca
            virada para cima e apoiado sobre o tapete:{' '}
            <Pontuation>10</Pontuation>
            {'\n'}• Se o pneu pesado (banda preta) estiver com a parte central
            branca virada para cima e apoiado sobre o tapete:{' '}
            <Pontuation>15</Pontuation>
            {'\n'}• Se os pneus estiverem completamente dentro do círculo alvo
            grande, com as partes centrais brancas viradas para cima e apoiados
            sobre o tapete: <Pontuation>5 cada</Pontuation>
          </Description>
        </View>
        <SelectContainer>
          <OnOff 
            marginBottom
            onChange={() => handlePneu('first')}
          />
          <OnOff 
            marginBottom 
            sumMarginBottom={12} 
            onChange={() => handlePneu('second')}
          />
          <Count 
            name="pneu" 
            max={max} 
            state={before}
            onChange={(n) => handlePontuationAdd(n)}
          />
        </SelectContainer>
      </DetailsMissionContainer>
    </Container>
  );
};

export default TombamentoDePneu;
