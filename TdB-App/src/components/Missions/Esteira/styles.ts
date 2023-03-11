import styled from 'styled-components/native';

interface Bottom {
  marginBottom?: boolean;
}

export const ContainerSelectMissions = styled.View`
  flex: 1;
  margin-right: 4px;
`;

export const SelectViewPart = styled.View<Bottom>`
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: ${props => (props.marginBottom ? 8 : 0)}px;
`;
