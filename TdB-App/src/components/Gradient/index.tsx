import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Gradient: React.FC = ({ children, ...rest }) => {
  return (
    <LinearGradient
      colors={['#FB8C00', '#fdc278']}
      style={{ flex: 1, ...rest }}
    >
      {children}
    </LinearGradient>
  );
};

export default Gradient;
