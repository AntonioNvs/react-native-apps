import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Colors from '../../styles/globalColors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const Title = styled.Text`
  font-size: 48px;
  font-family: 'Archivo-Bold';
  color: ${Colors.textWhite};
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-Regular';
  color: ${Colors.textWhite};
`;

export const Image = styled.ImageBackground`
  width: ${width - 100}px;
  height: ${height - 80}px;

  justify-content: center;
`;
