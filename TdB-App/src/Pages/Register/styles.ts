import styled from 'styled-components/native';
import Colors from '../../styles/globalColors';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface TextOptions {
  color: string;
}

export const MissionsScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const BottomContainer = styled.View`
  width: 100%;

  flex-direction: row;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
`;

export const TotalPointsText = styled.Text<TextOptions>`
  font-size: ${screenWidth > 330 ? 16 : 13}px;
  font-family: 'Poppins-Regular';
  color: ${props => props.color};
`;

export const ButtonSend = styled(RectButton)`
  width: ${screenWidth > 360 ? 84 : 76}px;
  height: ${screenHeight > 620 ? 40 : 32}px;
  background-color: ${Colors.black};
  border-radius: 8px;

  align-items: center;
  justify-content: center;
`;

export const TextButtonSend = styled.Text`
  margin-top: 4px;
  font-family: 'Poppins-Bold';
  color: ${Colors.textWhite};
`;

