import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff, SelectContainer } from '../Components/Select';

import ImageMaquinaDeRemo from '../../../../assets/images/maquinaRemo.png';
import MissionOptions from '../interface';

const screenWidth = Dimensions.get('window').width;

const MaquinaDeRemo: React.FC<MissionOptions> = ({ onPontuationChange }) => {

  const [stateMission, setStateMission] = useState({
    first: {
      state: false,
      pontuation: 15,
      subMission: 0,
    },
    second: {
      state: false,
      pontuation: 15,
      subMission: 1,
    }
  })
  const [block, setBlock] = useState(true)
  const nameMission = "Máquina de Remo"

  function handleFirst() {
    const point = stateMission.first.pontuation;
    const subMission = stateMission.first.subMission;

    if(stateMission.first.state) {
      if(stateMission.second.state) {
        onPontuationChange([
          {
            point: -point,
            nameMission,
            subMission,
          },
          {
            point: -stateMission.second.pontuation,
            nameMission,
            subMission: stateMission.second.subMission
          }
        ])
      }

      else {
        onPontuationChange([{
          point: -point,
          nameMission,
          subMission,
        }])
      }
      setStateMission({first: { ...stateMission.first, state: false }, second: { ...stateMission.second, state: false }})

      setBlock(true)
    } else {
      onPontuationChange([{
        point,
        nameMission,
        subMission,
      }])
      setStateMission({...stateMission, first: { ...stateMission.first, state: true }})
      setBlock(false)
    }
  }

  function handleSecond() {
    const point = stateMission.second.pontuation;
    const subMission = stateMission.second.subMission;

    if(stateMission.second.state) {
      onPontuationChange([{
        point,
        nameMission,
        subMission,
      }])
      setStateMission({...stateMission, second: { ...stateMission.second, state: false }})
    } else {
      onPontuationChange([{
        point,
        nameMission,
        subMission,
      }])
      setStateMission({...stateMission, second: { ...stateMission.second, state: true }})
    }
  }

  return (
    <Container>
      <Title>Máquina de Remo</Title>
      <DetailsMissionContainer>
        <Image source={ImageMaquinaDeRemo} height={38} width={48} />
        <View>
          <Description maxWidth={screenWidth > 400 ? 200 : 160}>
            • Se a roda móvel estiver completamente fora do círculo grande:{' '}
            <Pontuation>15</Pontuation>
            {'\n'}• Se a roda móvel estiver completamente dentro do círculo
            pequeno: <Pontuation>15 adicionais</Pontuation>
          </Description>
        </View>
        <SelectContainer>
          <OnOff 
            marginBottom
            state={stateMission.first.state}
            onChange={() => handleFirst()}
          />
          <OnOff 
            state={stateMission.second.state}
            onChange={() => handleSecond()}
            block={block}
          />
        </SelectContainer>
      </DetailsMissionContainer>
    </Container>
  );
};

export default MaquinaDeRemo;
