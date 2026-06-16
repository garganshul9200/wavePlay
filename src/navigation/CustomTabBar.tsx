import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MiniPlayerBar} from '../components/MiniPlayerBar';
import {colors, spacing, typography} from '../theme';

const TAB_CONFIG: Record<string, {label: string; icon: string}> = {
  Home: {label: 'Discover', icon: '⌂'},
  Player: {label: 'Player', icon: '♫'},
};

export function CustomTabBar({state, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, {paddingBottom: insets.bottom || spacing.sm}]}>
      <MiniPlayerBar />
      <View style={styles.tabRow}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const config = TAB_CONFIG[route.name] ?? {
            label: route.name,
            icon: '•',
          };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              onPress={onPress}
              style={styles.tabButton}>
              <View
                style={[
                  styles.iconWrap,
                  isFocused && styles.iconWrapFocused,
                ]}>
                <Text
                  style={[styles.tabIcon, isFocused && styles.tabIconFocused]}>
                  {config.icon}
                </Text>
              </View>
              <Text
                style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
                {config.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.tabBar,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tabRow: {
    flexDirection: 'row',
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    gap: 4,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapFocused: {
    backgroundColor: colors.accentSoft,
  },
  tabIcon: {
    fontSize: 16,
    color: colors.textMuted,
  },
  tabIconFocused: {
    color: colors.accentLight,
  },
  tabLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
  tabLabelFocused: {
    color: colors.accentLight,
  },
});
