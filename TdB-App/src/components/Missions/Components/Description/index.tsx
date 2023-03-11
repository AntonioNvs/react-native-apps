import React from 'react';

import { DescriptionStyle, PontuationStyle } from './styles';

export const Description: React.FC = ({ children, ...rest }) => (
  <DescriptionStyle style={{ ...rest }}>{children}</DescriptionStyle>
);

export const Pontuation: React.FC = ({ children }) => (
  <PontuationStyle>{children}</PontuationStyle>
);
