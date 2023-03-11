import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff, Count, SelectContainer } from '../Components/Select';

import ImageBanco from '../../../../assets/images/banco.png';
import MissionOptions from '../interface';

const screenWidth = Dimensions.get('window').width;

const Banco: React.FC<MissionOptions> = ({ onPontuationChange }) => {
  const [before, setBefore] = useState(0);
  const [stateMission, setStateMission] = useState({
    state: false,
    pontuation: 10,
  })
  const [block, setBlock] = useState(true)
  const [reset, setReset] = useState(false)

  function handleOnChangeFirst() {
    setStateMission({...stateMission, state: !stateMission.state})

    if(stateMission.state && before > 0) {
      onPontuationChange([
        {
          point: -10,
          nameMission: 'Banco',
          subMission: 0,
        },
        {
          point: -before*10,
          nameMission: 'Banco',
          subMission: 1
        }
      ])
      setReset(true)
    }
    else if(stateMission.state)
      onPontuationChange([{ point: -10, nameMission: 'Banco', subMission: 0 }])
    else
      onPontuationChange([{ point: 10, nameMission: 'Banco', subMission: 0 }])
  }

  function handleOnChangeSecond(n: number) {
    let point = 10 * (n - before);
    onPontuationChange([{ point, nameMission: 'Banco', subMission: 1 }]);
    setBefore(n)
    setReset(false)
  }

  useEffect(() => {
    if(stateMission.state)
      setBlock(false)
    else {
      setBlock(true)
      setBefore(0)
    }
  }, [stateMission])

  return (
    <Container>
      <Title>Banco</Title>
      <DetailsMissionContainer>
        <Image source={ImageBanco} height={38} width={48} />
        <View>
          <Description maxWidth={screenWidth > 400 ? 180 : 145}>
            • Se o banco estiver completamente abaixado:{' '}
            <Pontuation>10</Pontuation>
            {'\n'}• Se o banco estiver completamente abaixado e houver cubos
            tocando o tapete nos espaços de amarelinha:{' '}
            <Pontuation>10 cada espaço</Pontuation>
            {'\n'}• Se o encosto tiver sido completamente removido dos seus
            buracos de encaixe: <Pontuation>15</Pontuation>
          </Description>
        </View>
        <SelectContainer>
          <OnOff 
            marginBottom
            onChange={() => handleOnChangeFirst()}
            state={stateMission.state}
          />
          <Count 
            name="cubos" 
            max={8} 
            marginBottom 
            block={block}
            onChange={(n) => handleOnChangeSecond(Number(n))}
            reset={reset}
          />
          <OnOff 
            onChange={(state) => onPontuationChange([{
              point: state ? -15 : 15, 
              nameMission:'Banco', 
              subMission: 2}
            ])}
          />
        </SelectContainer>
      </DetailsMissionContainer>
    </Container>
  );
};

export default Banco;
