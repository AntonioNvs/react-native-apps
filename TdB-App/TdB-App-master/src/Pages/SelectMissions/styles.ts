import styled from 'styled-components/native';
import Colors from '../../styles/globalColors';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface OptionsSubTitle {
  color: string;
}

interface OptionsNumberContainer {
  select: boolean;
  side: string;
}

interface OptionsCard {
  align: string;
  select: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: ${Colors.background};

  bottom: -12px;

  margin: 0 16px 0 16px;
  border-radius: 12px;
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: 'Archivo-Bold';
  color: ${Colors.black};

  align-self: center;
`;

export const SubTitleContainer = styled.View`
  margin-top: 16px;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

export const SubTitle = styled.Text<OptionsSubTitle>`
  font-size: 14px;
  font-family: 'Poppins-Regular';
  color: ${props => props.color};
`;

export const CardContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Card = styled.TouchableOpacity`
  margin-top: 8px;
  flex: 1;
`;

export const CardView = styled.View<OptionsCard>`
  border-width: 2px;
  border-color: ${props => (props.select ? Colors.green : Colors.gray)};
  border-radius: 8px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  align-self: ${props => props.align};

  height: 64px;
  width: 96%;
`;

export const NumberContainer = styled.View<OptionsNumberContainer>`
  height: 24px;
  width: 48px;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  margin-left: ${props =>
    props.side === 'right' ? (screenWidth - 64) * 0.02 + 8 : 8}px;

  background-color: ${props => (props.select ? Colors.green : Colors.gray)};
`;

export const NumberTextMission = styled.Text`
  align-self: center;
  font-size: 12px;
  font-family: 'Archivo-Bold';
  color: ${Colors.textWhite};
`;

export const ImageMission = styled.Image`
  margin-left: 8px;
  width: 48px;
  height: 40px;
`;

export const TitleMissionContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TitleMission = styled.Text`
  margin-left: 8px;
  font-size: ${screenHeight > 600 ? 12 : 8}px;
  font-family: 'Archivo-Bold';
  color: ${Colors.black};
  max-width: 75%;
  text-align: center;
`;

export const ButtonConfirm = styled(RectButton)`
  align-self: flex-end;
  width: ${screenWidth > 350 ? 96 : 90}px;
  height: ${screenHeight > 620 ? 48 : 36}px;

  background-color: ${Colors.primary};
  border-radius: 8px;

  margin: 24px 0 24px 0;

  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  font-size: 12px;
  font-family: 'Archivo-Bold';
  color: ${Colors.textWhite};
`;
