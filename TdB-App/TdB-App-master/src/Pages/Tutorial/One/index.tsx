import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StatusBar, StyleSheet, View, Animated, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Voltar from '../../../../assets/images/Voltar.png';
import Gradient from '../../../components/Gradient';
import Colors from '../../../styles/globalColors';

import {
  ContainerSup,
  ContainerPass,
  ContainerBallInform,
  Ball,
} from './styles';

const screenWidth = Dimensions.get('window').width;

const OneScreenTutorial: React.FC = () => {
  const [opacity] = useState(new Animated.Value(0));
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 100 }));
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate('TwoScreenTutorial');
  }

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 0.1,
        bounciness: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, offset]);

  return (
    <>
      <StatusBar backgroundColor={Colors.black} />
      <ContainerSup>
        <MaterialIcon name="work" color={Colors.textWhite} size={108} />
      </ContainerSup>
      <Gradient>
        <Animated.View style={[styles.animated, { opacity: opacity }]}>
          <View />
          <Animated.Text
            style={[styles.text, { transform: [{ translateY: offset.y }] }]}
          >
            Tenha diversos ambientes de teste ao mesmo tempo
          </Animated.Text>
          <ContainerPass>
            <ContainerBallInform>
              <Ball color={Colors.black} />
              <Ball color={Colors.clear} />
              <Ball color={Colors.clear} />
            </ContainerBallInform>
            <RectButton onPress={handleNavigate}>
              <Image source={Voltar} />
            </RectButton>
          </ContainerPass>
        </Animated.View>
      </Gradient>
    </>
  );
};

const styles = StyleSheet.create({
  animated: {
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: screenWidth > 350 ? 24 : 18,
    fontFamily: 'Poppins-Regular',
    color: Colors.textWhite,

    alignSelf: 'center',
    textAlign: 'left',
    maxWidth: 250,
  },
});

export default OneScreenTutorial;
