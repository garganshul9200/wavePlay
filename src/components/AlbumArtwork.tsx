import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radius} from '../theme';

type Props = {
  accentColor: string;
  isPlaying: boolean;
  label?: string;
};

export function AlbumArtwork({accentColor, isPlaying, label = '♪'}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.ringOuter, {borderColor: `${accentColor}33`}]} />
      <View style={[styles.ringMiddle, {borderColor: `${accentColor}55`}]} />
      <View
        style={[
          styles.disc,
          {
            backgroundColor: accentColor,
            shadowColor: accentColor,
          },
          isPlaying && styles.discPlaying,
        ]}>
        <View style={styles.discInner}>
          <Text style={styles.discLabel}>{label}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringOuter: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
  },
  ringMiddle: {
    position: 'absolute',
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 1,
  },
  disc: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 12,
  },
  discPlaying: {
    transform: [{scale: 1.02}],
  },
  discInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discLabel: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
});
