import styled from 'styled-components/native';
import Colors from '../../styles/globalColors';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface ButtonOptions {
  color: string;
  disable: boolean
}

export const WelcomeText = styled.Text`
  font-size: ${screenHeight > 650 ? 30 : 25}px;
  font-family: 'Archivo-Bold';
  color: ${Colors.textWhite};
`;

export const GoodLuckText = styled.Text`
  font-size: ${screenHeight > 650 ? 21 : 18}px;
  font-family: 'Poppins-Regular';
  color: ${Colors.textWhite};
`;

export const TextContainer = styled.View`
  margin-top: ${screenHeight > 700 ? '200px' : `${screenHeight - 520 > 0 ? screenHeight - 520 : 20}px`};
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  padding: 6px;
  margin: 0 ${screenWidth > 360 ? 12 : 8}px 0 ${screenWidth > 360 ? 12 : 8}px;
  flex: 1;
  bottom: -12px;
  background-color: ${Colors.background};

  border-radius: 12px;

  align-items: center;
  justify-content: space-evenly;
`;

export const PartContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`;

export const SubPartContainer = styled.View`
  justify-content: space-between;
`;

export const DataPartContainer = styled.View`
  margin-bottom: 12px;
  justify-content: center;
  align-items: center;
`;

export const TextTitle = styled.Text`
  color: ${Colors.black};

  text-align: center;
  font-size: ${screenWidth > 400 ? 24 : 18 }px;
  font-family: 'Archivo-Bold';
  max-width: ${screenWidth - 48}px;
`;

export const TextSubTitle = styled.Text`
  font-size: ${screenWidth > 400 ? 16 : 13}px;
  font-family: 'Poppins-Regular';
  color: ${Colors.black};
`;

export const TextData = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-Regular';
  color: ${Colors.gray};
`;

export const Button = styled(RectButton)<ButtonOptions>`
  background-color: ${props => props.color};
  border-radius: 8px;

  width: ${screenWidth > 400 ? 132 : screenWidth > 340 ? 120 : 108}px;
  height: ${screenHeight > 700 ? '144px' : screenHeight > 580 ? '132px' : '120px'};

  justify-content: space-between;
  align-items: center;

  opacity: ${props => props.disable ? 0.6 : 1};
`;

export const TextButton = styled.Text`
  font-size: ${screenWidth > 400 ? 14 : 12}px;
  font-family: 'Poppins-Bold';
  text-align: center;
  color: ${Colors.textWhite};
  max-width: ${screenWidth > 400 ? 120 : screenWidth > 350 ? 112 : 96}px;
`;
