import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../theme';

type Props = {
  children: React.ReactNode;
  accentColor?: string;
};

export function ScreenBackground({children, accentColor = colors.accent}: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.glowTop, {backgroundColor: accentColor}]} />
      <View style={[styles.glowBottom, {backgroundColor: colors.cyan}]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  glowTop: {
    position: 'absolute',
    top: -120,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.18,
  },
  glowBottom: {
    position: 'absolute',
    bottom: 80,
    left: -100,
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.1,
  },
});
