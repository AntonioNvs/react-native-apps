/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, View, Dimensions } from 'react-native';

import {
  ContainerOnOff,
  ContainerCount,
  ButtonContainer,
  Button,
  TextButton,
  SelectContainerStyle,
} from './styles';
import Colors from '../../../../styles/globalColors';

const screenWidth = Dimensions.get('window').width;

export const SelectContainer: React.FC = ({ children, ...rest }) => (
  <SelectContainerStyle style={{ ...rest }}>{children}</SelectContainerStyle>
);

interface Bottom {
  marginBottom?: boolean;
  sumMarginBottom?: number;
  onChange(state: boolean | number): void;
  state?: any;
  block?: boolean;
}

interface CountOptions extends Bottom {
  max: number;
  name: string;
  init?: number;
  reset?: boolean;
}

export const OnOff: React.FC<Bottom> = ({
  onChange,
  state,
  block,
  marginBottom,
  sumMarginBottom,
  ...rest
}) => {
  const [select, setSelect] = useState(false);
  const [color] = useState(new Animated.Value(0));
  const [offset] = useState(new Animated.ValueXY({ x: -12, y: 0 }));
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    const toValueColor = select ? 1 : 0;
    const toValueX = select ? 12 : -12;

    Animated.parallel([
      Animated.spring(offset.x, {
        toValue: toValueX,
        speed: 1,
        bounciness: 0,
        useNativeDriver: false,
      }),
      Animated.timing(color, {
        toValue: toValueColor,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [select, color, offset]);

  useEffect(() => {
    if(!locked)
      setSelect(state)
  }, [state])

  const backgroundColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.red, Colors.green],
  });

  function handleState() {
    if(!locked) {
      setSelect(!select)
      onChange(select)
    }
  }

  useEffect(() => {
    if(block) {
      setLocked(true)
    } else {
      setLocked(false)
    }
  }, [block])

  return (
    <ContainerOnOff
      marginBottom={marginBottom}
      sumMarginBottom={sumMarginBottom ? sumMarginBottom : 0}
      style={{ ...rest }}
      onPress={handleState}
    >
      <Animated.View style={[styles.background, { backgroundColor }]} />
      <Animated.View
        style={[
          styles.ball,
          {
            backgroundColor,
            transform: [{ translateX: offset.x }],
          },
        ]}
      />
    </ContainerOnOff>
  );
};

export const Count: React.FC<CountOptions> = ({
  block,
  onChange,
  state,
  init,
  max,
  reset,
  marginBottom,
  sumMarginBottom,
  name,
  ...rest
}) => {
  const [count, setCount] = useState(0);
  const [color] = useState(new Animated.Value(0));
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    Animated.timing(color, {
      toValue: count,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [count, color]);

  const backgroundColor = color.interpolate({
    inputRange: [0, max],
    outputRange: [Colors.red, Colors.green],
  });

  function handlePlusCount() {
    if(!locked) {
      setCount(countActual => {
        if (countActual + 1 > max)
          return countActual;
        return countActual + 1;
      });
    } 
  }

  function handleLessCount() {
    if(!locked) {
      setCount(countActual => {
        if (countActual - 1 < 0)
          return countActual;
        return countActual - 1;
      });
    }
  }

  useEffect(() => {
    if(!locked)
      if(count != state && state)
        setCount(state)
  }, [state])

  useEffect(() => {
    if(block) 
      setLocked(true)
    else 
      setLocked(false) 
  }, [block])

  useEffect(() => {
    if(onChange)
      onChange(count)
  }, [count]);

  useEffect(() => {
    if(init)
      setCount(init)
  }, [init])

  useEffect(() => {
    if(reset)
      setCount(0)
  }, [reset])

  return (
    <ContainerCount
      marginBottom={marginBottom}
      sumMarginBottom={sumMarginBottom ? sumMarginBottom : 0}
      style={{ ...rest }}
    >
      <Animated.Text style={[styles.title, { color: backgroundColor }]}>
        {count} {name}
      </Animated.Text>
      <ButtonContainer>
        <View />
        <Button onPress={handleLessCount} color={Colors.red}>
          <TextButton>-</TextButton>
        </Button>
        <Button onPress={handlePlusCount} color={Colors.green}>
          <TextButton>+</TextButton>
        </Button>
        <View />
      </ButtonContainer>
    </ContainerCount>
  );
};

const styles = StyleSheet.create({
  background: {
    width: screenWidth > 400 ? 32 : 28,
    height: 16,
    borderRadius: 8,
  },
  ball: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 16,
  },

  title: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
  },
});
