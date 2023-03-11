import styled from 'styled-components/native';
import Colors from '../../styles/globalColors';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface TextDataOptions {
  color: string;
}

const windowWidth = Dimensions.get('window').width;

export const Title = styled.Text`
  font-family: 'Archivo-Bold';
  font-size: 24px;
  color: ${Colors.black};
  text-align: center;
`;

export const SubTitle = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 12px;
  color: ${Colors.primary};
  text-align: center;
`;

export const InformationContainer = styled.View`
  margin-top: 16px;
  width: ${Math.round(windowWidth - 88)}px;
`;

export const InformationTextContainer = styled.View`
  flex-direction: row;
  margin-top: 6px;
  justify-content: space-between;
  align-items: center;
`;

export const TitleInformation = styled.Text`
  margin-bottom: 4px;
  text-align: center;
  font-size: 16px;
  font-family: 'Archivo-Bold';
  color: ${Colors.black};
`;

export const TextInform = styled.Text`
  text-align: left;
  font-size: ${windowWidth > 330 ? 16 : 12}px;
  font-family: 'Poppins-Regular';
  color: ${Colors.black};
`;

export const TextData = styled.Text<TextDataOptions>`
  text-align: right;
  text-align: left;
  font-size: 16px;
  color: ${props => props.color};
`;

export const ButtonDataMissions = styled(RectButton)`
  margin-top: 24px;
  align-self: center;
  background-color: ${Colors.black};
  border-radius: 8px;

  width: 120px;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

export const TextButtonData = styled.Text`
  text-align: center;
  max-width: 96px;
  font-size: 14px;
  font-family: 'Archivo-Bold';
  color: ${Colors.textWhite};
`;

export const GraphicContainer = styled.View`
  margin-top: 24px;
`;

export const TitleGraphic = styled.Text`
  font-size: 18px;
  font-family: 'Archivo-Bold';

  text-align: center;
`;

export const FinallyContainer = styled.View`
  margin-top: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 24px;
`;

export const TextExportContainer = styled(RectButton)`
  flex-direction: row;
  align-items: center;
`;

export const TextExportCSV = styled.Text`
  font-family: 'Archivo-Regular';
  font-size: ${windowWidth > 330 ? 12 : 10}px;
  margin-left: 4px;
  margin-right: 4px;
  color: ${Colors.black};
`;

export const ButtonAllTestes = styled(RectButton)`
  width: 88px;
  height: 48px;
  border-radius: 8px;
  background-color: ${Colors.primary};

  align-items: center;
  justify-content: center;
`;

export const TextButtonAllTestes = styled.Text`
  text-align: center;
  font-family: 'Archivo-Bold';
  font-size: 12px;
  color: ${Colors.textWhite};
  max-width: 72px;
`;
