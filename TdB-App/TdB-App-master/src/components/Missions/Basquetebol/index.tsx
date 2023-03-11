import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff, SelectContainer } from '../Components/Select';

import ImageBasquetebol from '../../../../assets/images/basquetebol.png';
import MissionOptions from '../interface';

const screenWidth = Dimensions.get('window').width;

const Basquetebol: React.FC<MissionOptions> = ({ onPontuationChange }) => {
  const [stateMission, setStateMission] = useState({
    cube: {
      state: false,
      pontuation: 15,
      subMission: 0,
    },
    middle: {
      state: false,
      pontuation: 15,
      subMission: 1,
    },
    top: {
      state: false,
      pontuation: 25,
      subMission: 1,
    }
  })

  const nameMission = 'Basquetebol'

  function onChangeCube() {
    if(stateMission.cube.state) {
      let changes = [{
        point: -stateMission.cube.pontuation,
        nameMission,
        subMission: stateMission.cube.subMission,
      }];

      if(stateMission.middle.state)
        changes.push({
          point: -stateMission.middle.pontuation,
          nameMission,
          subMission: stateMission.middle.subMission
        })
      if(stateMission.top.state)
        changes.push({
          point: -stateMission.top.pontuation,
          nameMission,
          subMission: stateMission.top.subMission
        })
      
      onPontuationChange(changes)
      setStateMission({...stateMission, cube: {...stateMission.cube, state: false}})
    } else {
      onPontuationChange([{
        point: stateMission.cube.pontuation,
        nameMission,
        subMission: stateMission.cube.subMission,
      }])
      setStateMission({...stateMission, cube: {...stateMission.cube, state: true}})
    }
  }

  function onChangeOptions(option: string) {
    let point = stateMission.[option].pontuation;
    if(stateMission.middle.state || stateMission.top.state) {
      if(stateMission.[option].state) {
        onPontuationChange([{
          point: -point,
          nameMission,
          subMission: stateMission.[option].subMission,
        }]);
        setStateMission({...stateMission, [option]: {...stateMission.[option], state: false}})
      } else {
        let missionActive;

        if(stateMission.middle.state) missionActive = 'middle';
        else missionActive = 'top'

        onPontuationChange([{
          point: point -stateMission.[missionActive].pontuation,
          nameMission,
          subMission: stateMission.[option].subMission,
        }])

        setStateMission(
          {...stateMission, [option]: {...stateMission.[option], state: true}, [missionActive]: {...stateMission.[missionActive], state: false}}
        )
      }
    } else {
      onPontuationChange([{
        point,
        nameMission,
        subMission: stateMission.[option].subMission,
      }]);
      setStateMission({...stateMission, [option]: {...stateMission.[option], state: true}})
    }
  }

  return (
    <Container>
      <Title>Basquetebol</Title>
      <DetailsMissionContainer>
        <Image source={ImageBasquetebol} height={70} width={48} />
        <View>
          <Description maxWidth={screenWidth > 400 ? 200 : 160}>
            • Se houver um cubo dentro do caixote (pontos serão computados
            apenas para um cubo): <Pontuation>15</Pontuation>
            {'\n'}• Se o caixote estiver apoiado sobre a trava branca no meio do
            poste: <Pontuation>15</Pontuation>
            {'\n'}• Se o caixote estiver apoiado sobre a trava branca na parte
            de cima do poste: <Pontuation>25</Pontuation>
          </Description>
        </View>

        <SelectContainer>
          <OnOff 
            marginBottom
            onChange={(state) => 
              onPontuationChange([{nameMission, subMission: stateMission.cube.subMission, point: state ? -stateMission.cube.pontuation : stateMission.cube.pontuation
              }])} 
            state={stateMission.cube.state}
          />
          <OnOff 
            marginBottom
            onChange={() => onChangeOptions('middle')}
            state={stateMission.middle.state}
          />
          <OnOff 
            onChange={() => onChangeOptions('top')}
            state={stateMission.top.state}
          />
        </SelectContainer>
      </DetailsMissionContainer>
    </Container>
  );
};

export default Basquetebol;
