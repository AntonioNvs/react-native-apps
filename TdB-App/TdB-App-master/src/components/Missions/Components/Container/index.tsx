import React from 'react';

import { ContainerStyle, DetailsMissionContainerStyle } from './styles';

export const Container: React.FC = ({ children }) => (
  <ContainerStyle>{children}</ContainerStyle>
);

export const DetailsMissionContainer: React.FC = ({ children, ...rest }) => (
  <DetailsMissionContainerStyle style={{ ...rest }}>
    {children}
  </DetailsMissionContainerStyle>
);
