import React from 'react';
import { View, Dimensions } from 'react-native';

import Title from '../Components/Title';
import Image from '../Components/Image';
import { Container, DetailsMissionContainer } from '../Components/Container';
import { Description, Pontuation } from '../Components/Description';
import { OnOff } from '../Components/Select';

import ImageTelefoneCelular from '../../../../assets/images/celular.png';
import MissionOptions from '../interface';

const screenWidth = Dimensions.get('window').width;

const TelefoneCelular: React.FC<MissionOptions> = ({ onPontuationChange }) => {
  return (
    <Container>
      <Title>Telefone Celular</Title>
      <DetailsMissionContainer>
        <Image source={ImageTelefoneCelular} height={38} width={48} />
        <View>
          <Description maxWidth={screenWidth > 400 ? 200 : 160}>
            Se o telefone celular estiver com o lado branco virado para cima e
            apoiado somente sobre o tapete: <Pontuation>15</Pontuation>
          </Description>
        </View>
        <OnOff 
          onChange={(state) => onPontuationChange([{
            point: state ? -15 : 15,
            nameMission: 'Telefone Celular'
          }])}
        />
      </DetailsMissionContainer>
    </Container>
  );
};

export default TelefoneCelular;
