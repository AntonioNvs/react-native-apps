import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff, SelectContainer } from '../Components/Select';

import ImageEscorregador from '../../../../assets/images/escorregador.png';
import MissionOptions from '../interface';

const screenWidth = Dimensions.get('window').width;

const Escorregador: React.FC<MissionOptions> = ({ onPontuationChange }) => {
  const [block, setBlock] = useState(true)
  const [stateMission, setStateMission] = useState({
    one: {
      state: false,
      pontuation: 5,
      subMission: 0,
    },
    both: {
      state: false,
      pontuation: 20,
      subMission: 0,
    },
    ten: {
      state: false,
      pontuation: 10,
      subMission: 1,
    },
    twenty: {
      state: false,
      pontuation: 20,
      subMission: 2,
    }
  })

  const nameMission = 'Escorregador'

  function handleOnChange(name: string) {
    let point = stateMission.[name].pontuation;
    if(stateMission.one.state || stateMission.both.state) {
      if(stateMission.[name].state) {
        let changes = [{
          point: -point,
          nameMission,
          subMission: stateMission.[name].subMission,
        }];

        if(stateMission.ten.state)
          changes.push({
            point: -10,
            nameMission,
            subMission: stateMission.ten.subMission,
          })
        
        if(stateMission.twenty.state)
          changes.push({
            point: -20,
            nameMission,
            subMission: stateMission.twenty.subMission,
          })
        
        onPontuationChange(changes)
        setStateMission({...stateMission, [name]: {...stateMission.[name], state: false}})
      } 
      else {
        let missionActive;
        
        if(stateMission.one.state) missionActive = 'one';
        else missionActive = 'both'

        onPontuationChange([{
          point: point -stateMission.[missionActive].pontuation,
          nameMission,
          subMission: stateMission.[name].subMission,
        }])
        setStateMission(
          {...stateMission, [name]: {...stateMission.[name], state: true}, [missionActive]: {...stateMission.[missionActive], state: false}}
        )
      }
    } else {
      onPontuationChange([{
        point, 
        nameMission,
        subMission: stateMission.[name].subMission,
      }])
      setStateMission({...stateMission, [name]: {...stateMission.[name], state: true}})
    }
  }

  function handleOnChangeWithoutIf(option: string) {
    let point = stateMission.[option].pontuation;

    if(stateMission.one.state || stateMission.both.state) {
      if(stateMission.[option].state) {
        onPontuationChange([{
          point: -point, 
          nameMission,
          subMission: stateMission.[option].subMission,
        }]);
        setStateMission({...stateMission, [option]: {...stateMission.[option], state: false}})
      } else {
        onPontuationChange([{
          point, 
          nameMission,
          subMission: stateMission.[option].subMission,
        }]);
        setStateMission({...stateMission, [option]: {...stateMission.[option], state: true}})
      }
    }
  }

  useEffect(() => {
    if(stateMission.one.state || stateMission.both.state)
      setBlock(false)
    else {
      setBlock(true)
      stateMission.ten.state = false
      stateMission.twenty.state = false
    }
  }, [stateMission])

  return (
    <Container>
      <Title>Escorregador</Title>
      <DetailsMissionContainer>
        <Image source={ImageEscorregador} height={38} width={48} />
        <View>
          <Description maxWidth={screenWidth > 400 ? 200 : 160}>
            • Se apenas um bonequinho estiver fora do escorregador:{' '}
            <Pontuation>5</Pontuation>
            {'\n'}• Se ambos os bonequinhos estiverem fora do escorregador:{' '}
            <Pontuation>20</Pontuation>
            {'\n'}• Se um dos bonequinhos estiver completamente na área do robô:{' '}
            <Pontuation>10</Pontuation>
            {'\n'}• Se um dos bonequinhos estiver completamente fora de contato
            com o tapete, sobre o pneu pesado, sem estar tocando em mais nada:{' '}
            <Pontuation>20</Pontuation>
          </Description>
        </View>
        <SelectContainer>
          <OnOff 
            onChange={() => handleOnChange('one')} 
            marginBottom 
            state={stateMission.one.state}
          />
          <OnOff 
            onChange={() => handleOnChange('both')}
            marginBottom
            state={stateMission.both.state}
          />
          <OnOff 
            onChange={() => handleOnChangeWithoutIf('ten')} 
            marginBottom
            block={block}
            state={stateMission.ten.state}
          />
          <OnOff 
            onChange={() => handleOnChangeWithoutIf('twenty')}
            block={block}
            state={stateMission.twenty.state}
          />
        </SelectContainer>
      </DetailsMissionContainer>
    </Container>
  );
};

export default Escorregador;
