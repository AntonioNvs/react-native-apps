import React from 'react';
import { View, Dimensions } from 'react-native';

import { RightDetailsContainer } from './styles';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff } from '../Components/Select';

import ImageInovacao from '../../../../assets/images/inovacao.png';
import MissionOptions from '../interface';

const screenWidth = Dimensions.get('window').width;

const Inovacao: React.FC<MissionOptions> = ({ onPontuationChange }) => {
  return (
    <Container>
      <Title>Projeto de Inovação</Title>
      <DetailsMissionContainer>
        <View>
          <Description maxWidth={screenWidth > 400 ? 250 : 210}>
            Se o seu Projeto de Inovação tem pelo menos duas peças LEGO®
            brancas, tem um comprimento de, no mínimo, quatro pinos de um bloco
            LEGO em, pelo menos, uma das direções e uma de suas partes está em
            contato com a logo RePLAY SM ou a área cinza ao redor do banco:
            <Pontuation>{' '}20</Pontuation>
          </Description>
        </View>
        <RightDetailsContainer>
          <Image
            source={ImageInovacao}
            height={38}
            width={48}
            marginBottom={12}
          />

          <OnOff 
            onChange={(state: boolean) => onPontuationChange([{
              point: state ? -20 : 20, 
              nameMission: 'Projeto de Inovação',
            }])}
          />
        </RightDetailsContainer>
      </DetailsMissionContainer>
    </Container>
  );
};

export default Inovacao;
