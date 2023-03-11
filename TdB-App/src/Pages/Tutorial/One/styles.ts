import styled from 'styled-components/native';
import Colors from '../../../styles/globalColors';

interface BallOptions {
  color: string;
}

export const ContainerSup = styled.View`
  height: 42%;
  background-color: ${Colors.black};

  align-items: center;
  justify-content: center;
`;

export const ContainerPass = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin: 0px 24px 64px 24px;
  align-items: center;
  bottom: 0;
`;

export const ContainerBallInform = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 40px;
  height: 16px;
`;

export const Ball = styled.View<BallOptions>`
  width: 10px;
  height: 10px;
  background-color: ${props => props.color};
  border-radius: 8px;
`;
