import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Colors from '../../styles/globalColors';

const screenWidth = Dimensions.get('window').width;

interface TextMissionOptions {
  color: string;
  bold?: boolean;
}

interface TextMissionContainerOptions {
  align: string;
}

export const NumberTotalText = styled.Text`
  align-self: flex-start;
  margin-bottom: 8px;

  font-size: 16px;
  font-family: 'Archivo-Bold';
  color: ${Colors.gray};
`;

export const Card = styled.View`
  align-self: center;
  width: 100%;
  margin-top: 8px;

  border-width: 2px;
  border-color: ${Colors.black};
  border-radius: 12px;
  padding: 8px;
`;

export const TitleCard = styled.Text<TextMissionOptions>`
  color: ${props => props.color};
  font-family: 'Archivo-Bold';
  font-size: 16px;
  align-self: flex-start;
`;

export const CardMissionContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextMission = styled.Text<TextMissionOptions>`
  color: ${props => props.color};

  font-size: ${screenWidth > 350 ? 12 : 8}px;
  font-family: 'Poppins-${props => (props.bold ? 'Bold' : 'Regular')}';
`;

export const TextMissionContainer = styled.View<TextMissionContainerOptions>`
  width: ${props =>
    props.align ? (screenWidth - 100) / 3 : (screenWidth - 88) / 3}px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6px;

  margin-right: ${props => (props.align == 'left' ? 6 : 0)}px;
  margin-left: ${props => (props.align == 'right' ? 6 : 0)}px;
`;

export const CardTopContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
