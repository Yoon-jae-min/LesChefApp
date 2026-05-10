// 웹의 TabNavigation을 React Native로 변환
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fontSize } from '../../styles/theme';

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <Pressable
            key={tab}
            onPress={() => onTabChange(tab)}
            style={styles.tab}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 28,
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 10,
  },
  tabText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.stone500,
  },
  tabTextActive: {
    color: colors.orange600,
  },
  activeIndicator: {
    position: 'absolute',
    left: 4,
    right: 4,
    bottom: 2,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.orange500,
  },
});

export default TabNavigation;

