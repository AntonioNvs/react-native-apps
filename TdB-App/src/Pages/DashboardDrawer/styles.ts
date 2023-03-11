/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components/native';
import Colors from '../../styles/globalColors';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface TextOptions {
  color?: string;
  weight?: string;
}

export const Title = styled.Text`
  font-size: 18px;
  font-family: 'Archivo-Bold';
  color: ${Colors.black};

  padding: 12px;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  height: ${windowHeight - 144}px;
`;

export const Card = styled.View`
  margin-top: 16px;

  border: 1px solid ${Colors.black};
  border-radius: 8px;

  padding: 8px;
  width: ${windowWidth > 700 ? '268px' : '228px'};
  height: 72px;
`;

export const TopCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleWorkspace = styled.Text`
  font-size: 14px;
  font-family: 'Archivo-Bold';
  max-width: ${windowWidth > 700 ? '220px' : '180px'}
  color: ${Colors.black};
`;

export const BottomCard = styled.View`
  margin-top: 4px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Text = styled.Text<TextOptions>`
  font-size: 12px;

  font-family: ${props =>
    props.weight ? `Poppins-${props.weight}` : 'Poppins-Regular'};

  color: ${props => (props.color ? props.color : Colors.gray)};
`;

export const Credits = styled.View`
  border-top-width: 1px;

  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

export const CreditsRedes = styled.Text`
  width: ${windowWidth > 700 ? '268px' : '228px'};
`;

export const ContainerCredits = styled.TouchableOpacity`
  margin-bottom: 24px;
  flex-direction: row;

  width: ${windowWidth > 700 ? '268px' : '228px'};
  align-items: center;
`;

export const TextCredits = styled.Text`
  margin-left: 12px;

  font-size: 16px;
  font-family: 'Poppins-Regular';
`;
