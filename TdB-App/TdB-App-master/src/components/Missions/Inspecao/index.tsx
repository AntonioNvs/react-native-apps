import React from 'react';
import { View, Dimensions } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff } from '../Components/Select';

import MissionOptions from '../interface'
import ImageInspecao from '../../../../assets/images/inspecao.png';

const screenWidth = Dimensions.get('window').width;

const Inspecao: React.FC<MissionOptions> = ({ onPontuationChange }) => {
  return (
    <Container>
      <Title>Bônus de Inspeção de Equipamentos</Title>
      <DetailsMissionContainer>
        <Image source={ImageInspecao} height={38} width={48} />
        <View>
          <Description maxWidth={screenWidth > 400 ? 200 : 160}>
            Se todos os seus equipamentos couberem no espaço de inspeção
            pequeno: <Pontuation>20</Pontuation>
          </Description>
        </View>
        <OnOff 
          onChange={(state: boolean) => onPontuationChange([{
            point: state ? -20 : 20, 
            nameMission: 'Bônus de Inspeção de Equipamentos',
          }])}
        />
      </DetailsMissionContainer>
    </Container>
  );
};

export default Inspecao;
