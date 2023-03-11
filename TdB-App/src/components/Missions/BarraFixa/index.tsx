import React from 'react';
import { View, Dimensions } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff, SelectContainer } from '../Components/Select';

import ImageBarraFixa from '../../../../assets/images/barraFixa.png';
import MissionOptions from '../interface';

const screenWidth = Dimensions.get('window').width;

interface BarraFixaDTO extends MissionOptions {
  haveDoneSomeMissionEnd: {
    bar: boolean;
    dance: boolean;
  };
  functionSet(state: boolean, mission: string): void;
}

const BarraFixa: React.FC<BarraFixaDTO> = ({ onPontuationChange, functionSet, haveDoneSomeMissionEnd }) => {
  const nameMission = "Barra Fixa";

  function changeMission(state: boolean) {
    functionSet(!state, 'bar')
    onPontuationChange([{nameMission, point: state ? -30 : 30, subMission: 1}])
  }

  return (
    <Container>
      <Title>Barra Fixa</Title>
      <DetailsMissionContainer>
        <Image source={ImageBarraFixa} height={38} width={48} />
        <View>
          <Description maxWidth={screenWidth > 400 ? 200 : 160}>
            • Se o robô passar completamente sob a estrutura da barra fixa a
            qualquer momento: <Pontuation>15max</Pontuation>
            {'\n'}• Se a barra fixa estiver segurando 100% do robô fora do
            tapete no final do round: <Pontuation>30</Pontuation>
          </Description>
        </View>
        <View>
          <SelectContainer>
            <OnOff 
              marginBottom 
              onChange={(state) => onPontuationChange([{nameMission, point: state ? -15 : 15, subMission: 0}])}
            />
            <OnOff 
              onChange={(state) => changeMission(Boolean(state))}
              block={haveDoneSomeMissionEnd.dance}
            />
          </SelectContainer>
        </View>
      </DetailsMissionContainer>
    </Container>
  );
};

export default BarraFixa;
