import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header, Container, Total, SixtyTotal, Text } from './styles';

import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../styles/globalColors';

interface OptionsHeader {
  initial: boolean;
}

const Shape: React.FC<OptionsHeader> = ({ initial }) => {
  const navigation = useNavigation();

  if (initial) {
    return (
      <Header>
        <Container onPress={() => navigation.openDrawer()}>
          <Total />
          <SixtyTotal />
        </Container>
        <Text>TdB</Text>
      </Header>
    );
  } else {
    return (
      <Header>
        <Feather
          name="arrow-left"
          size={24}
          color={Colors.textWhite}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text>TdB</Text>
      </Header>
    );
  }
};

export default Shape;
