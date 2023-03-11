import styled from 'styled-components/native';
import Colors from '../../styles/globalColors';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Estilização do cronômetro
interface ButtonOptions {
  color: string;
}

export const CronometroContainer = styled.View`
  margin-bottom: 8px;
`;

export const Timer = styled.Text`
  text-align: center;
  font-size: ${screenWidth > 400 ? 56 : 48}px;
  font-family: 'Archivo-Bold';
  color: ${Colors.primary};
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
`;

export const ButtonViewContainer = styled.View`
  margin-top: 12px;
  flex: 1;

  align-items: center;
`;

export const Button = styled(RectButton)<ButtonOptions>`
  align-items: center;
  justify-content: center;

  width: ${screenWidth > 400 ? 108 : 96}px;
  height: ${screenHeight > 700 ? 56 : 48}px;
  background-color: ${props => props.color};

  border-radius: 8px;
`;

export const TextButton = styled.Text`
  font-size: 14px;
  font-family: 'Poppins-Bold';
  color: ${Colors.textWhite};
`;