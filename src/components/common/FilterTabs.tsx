// 웹의 FilterTabs를 React Native로 변환
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, borderRadius, fontSize } from '../../styles/theme';

interface FilterTabsProps {
  items: string[];
  activeItem: string;
  onItemChange: (item: string) => void;
  variant?: 'default' | 'gray';
}

function FilterTabs({
  items,
  activeItem,
  onItemChange,
  variant = 'default',
}: FilterTabsProps): React.JSX.Element {
  const getActiveStyle = (isActive: boolean) => {
    if (variant === 'gray') {
      return isActive
        ? { backgroundColor: colors.gray700, borderColor: colors.gray700 }
        : { backgroundColor: colors.white, borderColor: colors.gray300 };
    }
    // default variant (black)
    return isActive
      ? { backgroundColor: colors.black, borderColor: colors.black }
      : { backgroundColor: colors.white, borderColor: colors.gray300 };
  };

  const getTextStyle = (isActive: boolean) => {
    if (variant === 'gray') {
      return isActive ? colors.white : colors.gray700;
    }
    return isActive ? colors.white : colors.gray700;
  };

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = activeItem === item;
        return (
          <Pressable
            key={item}
            onPress={() => onItemChange(item)}
            style={[
              styles.tab,
              getActiveStyle(isActive),
            ]}
          >
            <Text style={[styles.tabText, { color: getTextStyle(isActive) }]}>
              {item}
            </Text>
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
    gap: 8,
  },
  tab: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tabText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
});

export default FilterTabs;

