import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff, SelectContainer, Count } from '../Components/Select';

import ImageBocha from '../../../../assets/images/bocha.png';
import MissionOptions from '../interface';

const screenWidth = Dimensions.get('window').width;

const Bocha: React.FC<MissionOptions> = ({ onPontuationChange }) => {
  const [before, setBefore] = useState(0)
  const nameMission = "Bocha"

  function handleCountPontuation(n: number) {
    onPontuationChange([{
      point: (n-before)*5,
      nameMission,
      subMission: 1,
    }])

    setBefore(n);
  }
  
  return (
    <Container>
      <Title>Bocha</Title>
      <DetailsMissionContainer>
        <Image source={ImageBocha} height={38} width={48} />
        <View>
          <Description maxWidth={screenWidth > 400 ? 200 : 160}>
            • Se o modelo lançador de cada equipe enviou apenas um cubo para
            qualquer lugar da arena adversária e os cubos são da mesma cor:{' '}
            <Pontuation>25</Pontuation>
            {'\n'}• Se houver cubos completamente dentro da sua quadra ou alvo:
            <Pontuation>5 cada cubo</Pontuation>
            {'\n'}• Se houver, pelo menos, um cubo amarelo completamente dentro
            do seu alvo: <Pontuation>10 adicionais</Pontuation>
          </Description>
        </View>
        <SelectContainer>
          <OnOff 
            marginBottom
            onChange={(state) => onPontuationChange([{
              point: state ? -25 : 25,
              nameMission,
              subMission: 0,
            }])}
          />
          <Count 
            name="cubos" 
            max={15} 
            marginBottom 
            onChange={(n) => handleCountPontuation(Number(n))}
          />
          <OnOff 
            onChange={(state) => onPontuationChange([{
              point: state ? -10 : 10,
              nameMission,
              subMission: 2
            }])}
          />
        </SelectContainer>
      </DetailsMissionContainer>
    </Container>
  );
};

export default Bocha;
