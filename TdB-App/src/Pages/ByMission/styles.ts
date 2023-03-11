import styled from 'styled-components/native';
import Colors from '../../styles/globalColors';

interface TextInformationOptions {
  color: string;
  textAlign: string;
}

export const InformationContainer = styled.View`
  margin-top: 8px;
`;

export const TitleInformation = styled.Text`
  font-size: 18px;
  color: ${Colors.black};
  font-family: 'Archivo-Bold';
  margin-bottom: 12px;
`;

export const SubTitleInformation = styled.Text`
  font-size: 16px;
  color: ${Colors.black};
  font-family: 'Poppins-Regular';
  margin-bottom: 4px;
`;

export const ContainerMission = styled.View`
  padding: 6px;
  margin-top: 16px;
  border-bottom-width: 2px;
  border-color: ${Colors.clear};
`;

export const TitleMission = styled.Text`
  text-align: center;

  font-size: 18px;
  font-family: 'Archivo-Regular';
  color: ${Colors.black};
`;

export const ContainerDataMission = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 10px;
`;

export const TextInformation = styled.Text<TextInformationOptions>`
  text-align: ${props => props.textAlign};
  color: ${props => props.color};

  font-size: 16px;
  font-family: 'Poppins-Regular';
`;

export const TitleSubMission = styled.Text`
  font-size: 16px;
  font-family: 'Archivo-Regular';
  color: ${Colors.black};
`;
