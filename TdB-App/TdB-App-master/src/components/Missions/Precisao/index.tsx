import React, { useState } from 'react';
import { Dimensions } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { Count } from '../Components/Select';

import ImagePrecisao from '../../../../assets/images/precisao.png';
import MissionOptions from '../interface';

const screenWidth = Dimensions.get('window').width;

const Precisao: React.FC<MissionOptions> = ({ onPontuationChange }) => {
  const [before, setBefore] = useState(0)

  const pontuation = [0, 5, 10, 20, 30, 45, 60]

  function handlePontuation(n: number) {
    onPontuationChange([{
      point:  pontuation[n] - pontuation[before],
      nameMission: "Precisão"
    }])
    setBefore(n)
  }

  return (
    <Container>
      <Title>Precisão</Title>
      <DetailsMissionContainer>
        <Description maxWidth={screenWidth > 400 ? 180 : 150}>
          Se o número de discos de precisão restantes na arena for:
          <Pontuation>20</Pontuation>
        </Description>
        <Count 
          max={6} 
          name="precisões" 
          onChange={(n) => handlePontuation(Number(n))}
          init={6}
        />

        <Image source={ImagePrecisao} height={38} width={48} />
      </DetailsMissionContainer>
    </Container>
  );
};

export default Precisao;
