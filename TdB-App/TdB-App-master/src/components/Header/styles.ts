import styled from 'styled-components/native';
import Colors from '../../styles/globalColors';

export const Header = styled.View`
  padding: 15px;
  height: 56px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Container = styled.TouchableOpacity`
  width: 32px;
  height: 14px;
  justify-content: space-between;
`;

export const Total = styled.View`
  width: 32px;
  height: 4px;
  background-color: ${Colors.background};
`;

export const SixtyTotal = styled.View`
  width: 20px;
  height: 4px;
  background-color: ${Colors.background};
`;

export const Text = styled.Text`
  font-size: 24px;
  font-family: 'Archivo-Bold';
  color: ${Colors.textWhite};
`;
