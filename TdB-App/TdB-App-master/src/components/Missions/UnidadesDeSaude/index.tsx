import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { SelectContainer, Count } from '../Components/Select';

import ImageUnidadesDeSaude from '../../../../assets/images/unidadesSaude.png';
import MissionOptions from '../interface';

import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const UnidadesDeSaude: React.FC<MissionOptions> = ({ onPontuationChange }) => {
  const [stateMission, setStateMission] = useState({
    touch: {
      pontuation: 5,
      before: 0,
      max: 8,
      subMission: 0,
    },
    under: {
      pontuation: 10,
      before: 0,
      max: 4,
      subMission: 1,
    }
  });

  const nameMission = "Unidades de Saúde"

  function handleTouch(n: number) {
    onPontuationChange([{
      point: (n-stateMission.touch.before)*stateMission.touch.pontuation,
      nameMission,
      subMission: stateMission.touch.subMission,
    }])

    setStateMission({
      ...stateMission, 
      touch: { ...stateMission.touch, before: n},
      under: { ...stateMission.under, max: (n > 4) ? 8 - n : 4}
    });
  }

  function handleUnder(n: number) {
    onPontuationChange([{
      point: (n-stateMission.under.before)*stateMission.under.pontuation,
      nameMission,
      subMission: stateMission.under.subMission,
    }])

    setStateMission({
      ...stateMission, 
      under: {...stateMission.under, before: n},
      touch: {...stateMission.touch, max: 8 - n}
    })
  }

  return (
    <Container>
      <Title>Unidades de Saúde</Title>
      <DetailsMissionContainer>
        <Image source={ImageUnidadesDeSaude} height={38} width={48} />
        <View>
          <Description maxWidth={screenWidth > 400 ? 180 : 150}>
            Se as unidades da saúde estiverem: • Tocando a logo RePLAY ou a área
            cinza ao redor do banco: <Pontuation>5 cada</Pontuation>
            {'\n'}• Com a argola pendurada em uma das barras verticais da barra
            fixa como ilustrado - máximo de quatro - e sem tocar em nenhum
            equipamento: <Pontuation>10 cada</Pontuation>
          </Description>
        </View>
        <SelectContainer>
          <Count 
            name="unidades" 
            max={stateMission.touch.max} 
            marginBottom
            onChange={(n) => handleTouch(Number(n))}
          />
          <Count 
            name="unidades" 
            max={stateMission.under.max}
            onChange={(n) => handleUnder(Number(n))}
          />
        </SelectContainer>
      </DetailsMissionContainer>
    </Container>
  );
};

export default UnidadesDeSaude;
