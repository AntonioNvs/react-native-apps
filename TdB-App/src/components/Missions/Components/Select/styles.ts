import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Colors from '../../../../styles/globalColors';
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width;

interface ButtonOptions {
  color: string;
}

interface Bottom {
  marginBottom: boolean;
  sumMarginBottom: number;
}

export const SelectContainerStyle = styled.View`
  align-items: flex-end;
  justify-content: space-between;
`;

export const ContainerOnOff = styled(RectButton)<Bottom>`
  height: 24px;
  width: 40px;

  margin-bottom: ${props =>
    props.marginBottom ? 8 + props.sumMarginBottom : 0}px;
  align-items: center;
  justify-content: center;
`;

export const ContainerCount = styled.View<Bottom>`
  width: 64px;
  margin-bottom: ${props =>
    props.marginBottom ? 8 + props.sumMarginBottom : 0}px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled(RectButton)<ButtonOptions>`
  background-color: ${props => props.color};
  width: 24px;
  height: 24px;

  border-radius: 12px;

  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  font-size: 12px;
  color: ${Colors.background};
  font-family: 'Roboto-Bold';
`;
