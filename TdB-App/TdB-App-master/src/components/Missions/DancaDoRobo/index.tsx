import React from 'react';
import { View, Dimensions } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff } from '../Components/Select';

import ImageDancaDoRobo from '../../../../assets/images/dancaRobo.png';
import MissionOptions from '../interface';

const screenWidth = Dimensions.get('window').width;

interface DancaDoRoboDTO extends MissionOptions {
  haveDoneSomeMissionEnd: {
    bar: boolean;
    dance: boolean;
  };
  functionSet(state: boolean, mission: string): void;
}

const DancaDoRobo: React.FC<DancaDoRoboDTO> = ({ onPontuationChange, functionSet, haveDoneSomeMissionEnd }) => {

  function changeMission(state: boolean) {  
    functionSet(!state, 'dance')
    onPontuationChange([{
      point: state ? -20 : 20,
      nameMission: 'Dança do robô'
    }])
  }
  return (
    <Container>
      <Title>Dança do robô</Title>
      <DetailsMissionContainer>
        <Image source={ImageDancaDoRobo} height={38} width={48} />

        <View>
          <Description maxWidth={screenWidth > 400 ? 200 : 160}>
            Se o controlador do robô estiver, pelo menos parcialmente, sobre a
            pista de dança, movendo-se como se estivesse fazendo um "dança" no
            final do round: <Pontuation>20</Pontuation>
          </Description>
        </View>
        <OnOff 
          onChange={(state) => changeMission(Boolean(state))}
          block={haveDoneSomeMissionEnd.bar}
        />
      </DetailsMissionContainer>
    </Container>
  );
};

export default DancaDoRobo;
