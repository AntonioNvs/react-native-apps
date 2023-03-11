import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff, SelectContainer } from '../Components/Select';

import ImageContadorDePassos from '../../../../assets/images/contadorPassos.png';
import MissionOptions from '../interface';

const screenWidth = Dimensions.get('window').width;

const ContadorDePassos: React.FC<MissionOptions> = ({ onPontuationChange }) => {

  const [stateMission, setStateMission] = useState({
    magenta: false,
    yellow: false,
    blue: false,
  })

  const pontuation = {
    magenta: 10,
    yellow: 15,
    blue: 20,
  }

  // Verificando se algum ponto já foi feito, se sim
  function handleOnIfChange(color: string) {
    // Verifica se já foi feito algum ponto
    let pont = pontuation.[color]

    if(stateMission.magenta || stateMission.yellow || stateMission.blue) {
      // Caso seja o que já está ativo, só o desative e envie menos pontos ao principal
      if(stateMission.[color]) {
        onPontuationChange([{
          point: -pont, 
          nameMission: 'Contador de Passos'
        }])
        setStateMission({...stateMission, [color]: false})
      }
      // Se for diferente, desative o atual e ative o pressionado
      else {
        let colorActive;
        
        if(stateMission.magenta) colorActive = 'magenta';
        else if(stateMission.yellow) colorActive = 'yellow'
        else colorActive = 'blue';

        pont = pont - pontuation.[colorActive]
        onPontuationChange([{
          point: pont, 
          nameMission: 'Contador de Passos'
        }])
        setStateMission({...stateMission, [color]: true, [colorActive]: false})
      }
    }
    else {
      onPontuationChange([{
        point: pont, 
        nameMission: 'Contador de Passos'
      }])
      setStateMission({...stateMission, [color]: true})
    }
  }

  return (
    <Container>
      <Title>Contador de Passos</Title>
      <DetailsMissionContainer>
        <Image source={ImageContadorDePassos} height={38} width={48} />
        <View>
          <Description maxWidth={screenWidth > 400 ? 200 : 160} fontSize={10}>
            Se a ponta do indicador estiver sobre a cor:{'\n'}• Magenta:{' '}
            <Pontuation>10</Pontuation>
            {'\n'}• Amarelo: <Pontuation>15</Pontuation>
            {'\n'}• Azul: <Pontuation>20</Pontuation>
          </Description>
        </View>
        <SelectContainer>
          <OnOff 
            marginBottom
            state={stateMission.magenta}
            onChange={() => handleOnIfChange('magenta')}
          />
          <OnOff 
            marginBottom
            state={stateMission.yellow}
            onChange={() => handleOnIfChange('yellow')}
          />
          <OnOff
            state={stateMission.blue}
            onChange={() => handleOnIfChange('blue')}
          />
        </SelectContainer>
      </DetailsMissionContainer>
    </Container>
  );
};

export default ContadorDePassos;
