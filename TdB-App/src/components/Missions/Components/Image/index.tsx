import React from 'react';

import { ImageSourcePropType } from 'react-native';

import { ImageStyle } from './styles';

interface ImageOptions {
  source: ImageSourcePropType;
  width: number;
  height: number;
}

const Image: React.FC<ImageOptions> = ({ source, ...rest }) => (
  <ImageStyle source={source} style={{ ...rest }} />
);

export default Image;
