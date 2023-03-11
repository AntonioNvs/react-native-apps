import React, { useState } from 'react';

import { ContainerSelectMissions, SelectViewPart } from './styles';
import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff } from '../Components/Select';

import ImageEsteira from '../../../../assets/images/esteira.png';
import Colors from '../../../styles/globalColors';
import MissionOptions from '../interface';

const Esteira: React.FC<MissionOptions> = ({ onPontuationChange }) => {
  const [stateMission, setStateMission] = useState({
    gray: {
      state: false,
      pontuation: 5
    },
    red: {
      state: false,
      pontuation: 10,
    },
    orange: {
      state: false,
      pontuation: 15,
    },
  yellow: {
      state: false,
      pontuation: 20
    },
    greenClean: {
      state: false,
      pontuation: 25,
    },
    greenDark: {
      state: false,
      pontuation: 30,
    }
  })
  const [active, setActive] = useState('')

  const nameMission = "Esteira"

  function handleState(color: string) {
    const point = stateMission.[color].pontuation
    if(active) {
      if(active === color) {
        onPontuationChange([{
          point: -point,
          nameMission,
        }])
        setStateMission({...stateMission, [color]: {...stateMission.[color], state: false}})
        setActive('')
      } else {
        onPontuationChange([
          {
            point: point-stateMission.[active].pontuation,
            nameMission,
          },
        ])
        setStateMission({...stateMission, [color]: {...stateMission.[color], state: true}, [active]: {...stateMission.[active], state: false}})
        setActive(color)
      }
    } else {
      onPontuationChange([{
        point,
        nameMission,
      }])
      setStateMission({...stateMission, [color]: {...stateMission.[color], state: true}})
      setActive(color)
    }
  }

  return (
    <Container>
      <Title>Esteira</Title>
      <Description alignSelf="center" marginTop={6}>
        Se o robô girar os roletes de modo que o ponteiro aponte para o:
      </Description>
      <DetailsMissionContainer>
        <ContainerSelectMissions>
          <SelectViewPart marginBottom>
            <Description fontFamily="Poppins-Bold">
              Cinza
            </Description>
            <OnOff
              state={stateMission.gray.state}
              onChange={() => handleState('gray')}
            />
          </SelectViewPart>
          <SelectViewPart marginBottom>
            <Description fontFamily="Poppins-Bold" color={Colors.red}>
              Vermelho
            </Description>
            <OnOff
              state={stateMission.red.state}
              onChange={() => handleState('red')}
            />
          </SelectViewPart>
          <SelectViewPart>
            <Description fontFamily="Poppins-Bold" color={Colors.primary}>
              Laranja
            </Description>
            <OnOff 
              state={stateMission.orange.state}
              onChange={() => handleState('orange')}
            />
          </SelectViewPart>
        </ContainerSelectMissions>
        <ContainerSelectMissions>
          <SelectViewPart>
            <Description fontFamily="Poppins-Bold" color={Colors.yellow}>
              Amarelo
            </Description>
            <OnOff 
              state={stateMission.yellow.state}
              onChange={() => handleState('yellow')}
            />
          </SelectViewPart>
          <SelectViewPart>
            <Description fontFamily="Poppins-Bold" color={Colors.greenClear}>
              Verde Claro
            </Description>
            <OnOff 
              state={stateMission.greenClean.state}
              onChange={() => handleState('greenClean')}
            />
          </SelectViewPart>
          <SelectViewPart>
            <Description fontFamily="Poppins-Bold" color={Colors.greenDark}>
              Verde Escuro
            </Description>
            <OnOff 
              state={stateMission.greenDark.state}
              onChange={() => handleState('greenDark')}
            />
          </SelectViewPart>
        </ContainerSelectMissions>
        <Image source={ImageEsteira} height={38} width={48} />
      </DetailsMissionContainer>
    </Container>
  );
};

export default Esteira;
