import styled from 'styled-components/native';
import Colors from '../../styles/globalColors';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface ColorTextData {
  color?: string;
  alignment: string;
  weight?: string;
}

const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  background-color: ${Colors.background};
  flex: 1;
  bottom: -12px;

  border-radius: 12px;
  margin: 0 16px 0 16px;
  padding: 16px;

  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${screenHeight > 650 ? 30 : 24}px;
  font-family: 'Archivo-Bold';
  color: ${Colors.black};

  text-align: center;

  margin-bottom: 12px;
`;

export const InitialInformationContainer = styled.View``;

export const TextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${Math.round(windowWidth - 88)}px;

  margin-top: 20px;
`;

export const TextInform = styled.Text`
  text-align: left;

  font-size: ${screenHeight > 650 ? 15 : 13}px;
  font-family: 'Poppins-Regular';
  color: ${Colors.black};
`;

export const TextData = styled.Text<ColorTextData>`
  text-align: ${props => props.alignment};

  font-size: ${screenHeight > 650 ? 15 : 13}px;
  font-family: ${props =>
    props.weight ? `Poppins-${props.weight}` : 'Poppins-Regular'};
  color: ${props => (props.color ? props.color : Colors.gray)};
`;

export const GraphicContainer = styled.View`
  margin-top: 36px;
  align-items: center;
  justify-content: center;
`;

export const TitleGraphic = styled.Text`
  font-size: ${screenHeight > 650 ? 18 : 16}px;
  font-family: 'Archivo-Bold';

  text-align: center;
`;

export const FinallyInformationContainer = styled.View`
  margin-top: 28px;

  flex-direction: row;
  width: ${Math.round(windowWidth - 88)}px;
  justify-content: space-between;
`;
