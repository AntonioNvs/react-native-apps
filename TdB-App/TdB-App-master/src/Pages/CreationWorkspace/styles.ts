import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Colors from '../../styles/globalColors';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface TextOptions {
  color: string;
  align: string;
}

export const Error = styled.Text`
  font-size: 14px;
  font-family: 'Archivo-Regular';
  color: ${Colors.red};
  margin-top: 8px;
`;

export const MainContainer = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: 'Archivo-Bold';
  color: ${Colors.black};

  text-align: center;
`;

export const InputContainer = styled.View`
  margin-top: 24px;

  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${Colors.grayInput};
  border-radius: 10px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;
`;

export const InputTitle = styled.TextInput`
  margin-left: 12px;
  flex: 1;
  color: ${Colors.gray};
  font-size: 16px;
  font-family: 'Archivo';
`;

export const DataContainer = styled.View`
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

export const TextInformation = styled.Text<TextOptions>`
  font-size: 14px;
  font-family: 'Poppins-Regular';
  color: ${props => props.color};

  text-align: ${props => props.align};
`;

export const ButtonMissions = styled(RectButton)`
  margin-top: 8px;
  width: ${screenWidth > 620 ? 120 : 100}px;
  height: ${screenHeight > 620 ? 56 : 48}px;

  background-color: ${Colors.primary};
  border-radius: 8px;

  align-items: center;
  justify-content: center;
`;

export const TimeContainer = styled.View`
  margin-left: 32px;
`;

export const TimeView = styled.View`
  margin-top: 8px;
  align-items: center;
`;

export const TextTime = styled.Text`
  color: ${Colors.clear};
  font-size: 12px;
  font-family: 'Poppins-Regular';
`;

export const InputTime = styled.TextInput`
  width: 64px;
  height: 56px;

  background-color: ${Colors.grayInput};
  border-radius: 8px;

  color: ${Colors.gray};
  text-align: center;
`;

export const PointText = styled.Text`
  margin-left: 12px;
  margin-right: 12px;
  font-size: 32px;
`;

export const ButtonSend = styled(RectButton)`
  margin-top: 16px;
  width: ${screenWidth > 620 ? 64 : 56}px;
  height: 48px;
  align-self: flex-end;
  background-color: ${Colors.black};
  border-radius: 8px;

  align-items: center;
  justify-content: center;
`;
