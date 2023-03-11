import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../styles/globalColors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ViewAnimated: React.FC = ({ children, ...rest }) => {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: -100 }));
  const [opacity] = useState(new Animated.Value(0));
  const [load, setLoad] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (load) {
      Animated.parallel([
        Animated.spring(offset.y, {
          toValue: 120,
          speed: 10000,
          bounciness: 0,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 10,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(offset.y, {
          toValue: 0,
          speed: 2,
          bounciness: 0,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }

    navigation.addListener('focus', () => setLoad(false));
    navigation.addListener('blur', () => setLoad(true));
  }, [load, navigation, opacity, offset]);

  return (
    <Animated.View
      style={[
        styles.viewAnimated,
        { opacity: opacity, transform: [{ translateY: offset.y }] },
        { ...rest },
        ,
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  viewAnimated: {
    flex: 1,
    marginLeft: screenWidth > 360 ? 12 : 8,
    marginRight: screenWidth > 360 ? 12 : 8,
    padding: 14,
    borderRadius: 12,
    backgroundColor: Colors.background,
  },
});

export default ViewAnimated;
