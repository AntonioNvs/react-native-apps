import React, { useState } from 'react';

import { TopMissionContainer } from './styles';
import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff } from '../Components/Select';

import ImageAparelhoDeGinastica from '../../../../assets/images/ginastica.png';
import Colors from '../../../styles/globalColors';
import MissionOptions from '../interface';

import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const AparelhoDeGinastica: React.FC<MissionOptions> = ({ onPontuationChange }) => {
  const [stateMission, setStateMission] = useState({
    blue: {
      state: false,
      pontuation: 10,
    },
    magenta: {
      state: false,
      pontuation: 15,
    },
    yellow: {
      state: false,
      pontuation: 20
    }
  })
  const [active, setActice] = useState('')

  const nameMission = "Aparelho de ginástica"

  function handleActive(color: string) {
    const point = stateMission.[color].pontuation

    if(active) {
      if(active === color) {
        onPontuationChange([{
          point: -point,
          nameMission,
        }]);
        setStateMission({...stateMission, [color]: {...stateMission.[color], state: false}})
        setActice('')
      } else {
        onPontuationChange([{
          point: point-stateMission.[active].pontuation,
          nameMission,
        }]);
        setStateMission({...stateMission, [color]: {...stateMission.[color], state: true}, [active]: {...stateMission.[active], state: false}})
        setActice(color)
      }
    } else {
      onPontuationChange([{
        point: point,
        nameMission,
      }]);
      setStateMission({...stateMission, [color]: {...stateMission.[color], state: true}})
      setActice(color)
    }
  }

  return (
    <Container>
      <Title>Aparelho de ginástica</Title>
      <TopMissionContainer>
        <Description maxWidth={screenWidth > 400 ? 240 : 205}>
          Se o robô girar os roletes de modo que o ponteiro aponte para o:
        </Description>
        <Image source={ImageAparelhoDeGinastica} height={38} width={48} />
      </TopMissionContainer>
      <DetailsMissionContainer>
        <Description fontFamily="Poppins-Bold" color={Colors.blue}>
          Azul <Pontuation>10</Pontuation>
        </Description>
        <OnOff
          onChange={() => handleActive('blue')}
          state={stateMission.blue.state}
        />

        <Description fontFamily="Poppins-Bold" color={Colors.magenta}>
          Magenta <Pontuation>15</Pontuation>
        </Description>
        <OnOff 
          onChange={() => handleActive('magenta')}
          state={stateMission.magenta.state}
        />

        <Description fontFamily="Poppins-Bold" color={Colors.yellow}>
          Amarelo <Pontuation>20</Pontuation>
        </Description>
        <OnOff 
          onChange={() => handleActive('yellow')}
          state={stateMission.yellow.state}
        />
      </DetailsMissionContainer>
    </Container>
  );
};

export default AparelhoDeGinastica;
