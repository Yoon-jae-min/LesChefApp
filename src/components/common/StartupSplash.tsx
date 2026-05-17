import React, { useEffect, useRef } from 'react';
import { Animated, Image, StatusBar, StyleSheet, View } from 'react-native';
import { Images } from '../../assets/images';

type StartupSplashProps = {
  onFinish: () => void;
};

const SPLASH_DURATION_MS = 1600;
const FADE_DURATION_MS = 350;

function StartupSplash({ onFinish }: StartupSplashProps): React.JSX.Element {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = Animated.timing(opacity, {
      toValue: 1,
      duration: FADE_DURATION_MS,
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(opacity, {
      toValue: 0,
      duration: FADE_DURATION_MS,
      useNativeDriver: true,
    });

    const timer = setTimeout(() => {
      fadeOut.start(({ finished }) => {
        if (finished) {
          onFinish();
        }
      });
    }, SPLASH_DURATION_MS);

    fadeIn.start();

    return () => {
      clearTimeout(timer);
    };
  }, [onFinish, opacity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Animated.View style={[styles.logoWrap, { opacity }]}>
        <Image source={Images.LesChef_SplashLogo} style={styles.logo} resizeMode="contain" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 48,
  },
  logo: {
    width: 260,
    height: 152,
  },
});

export default StartupSplash;
