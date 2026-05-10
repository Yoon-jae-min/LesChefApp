import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Images } from '../../assets/images';
import { colors, spacing, fontSize } from '../../styles/theme';

type StartupSplashProps = {
  onFinish: () => void;
};

function StartupSplash({ onFinish }: StartupSplashProps): React.JSX.Element {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ).start();

    const createDotAnimation = (animValue: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      );

    createDotAnimation(dotAnim1, 0).start();
    createDotAnimation(dotAnim2, 200).start();
    createDotAnimation(dotAnim3, 400).start();

    timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(onFinish);
    }, 2000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [dotAnim1, dotAnim2, dotAnim3, fadeAnim, onFinish, rotateAnim, scaleAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const dot1TranslateY = dotAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const dot2TranslateY = dotAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const dot3TranslateY = dotAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleAnim }] }]}>
          <Image source={Images.LesChef_AppIconMark} style={styles.logoImage} resizeMode="contain" />
        </Animated.View>

        <View style={styles.iconsContainer}>
          <Animated.View style={[styles.iconWrapper, { transform: [{ rotate: rotateInterpolate }] }]}>
            <Text style={styles.iconEmoji}>👨‍🍳</Text>
          </Animated.View>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconEmoji}>❄️</Text>
          </View>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconEmoji}>🍳</Text>
          </View>
        </View>

        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, styles.dot1, { transform: [{ translateY: dot1TranslateY }] }]} />
          <Animated.View style={[styles.dot, styles.dot2, { transform: [{ translateY: dot2TranslateY }] }]} />
          <Animated.View style={[styles.dot, styles.dot3, { transform: [{ translateY: dot3TranslateY }] }]} />
        </View>

        <Text style={styles.loadingText}>
          요리와 식재료의 모든 것을{'\n'}준비하고 있습니다
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orange50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 188,
    height: 120,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 32,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 4,
    marginBottom: spacing.xl,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dot1: {
    backgroundColor: colors.orange400,
  },
  dot2: {
    backgroundColor: colors.red500,
  },
  dot3: {
    backgroundColor: colors.yellow200,
  },
  loadingText: {
    fontSize: fontSize.base,
    color: colors.gray600,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: fontSize.base * 1.5,
  },
});

export default StartupSplash;
