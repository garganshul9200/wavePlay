import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, radius} from '../theme';
import {PAUSE_ICON, PLAY_ICON} from '../theme/icons';

type Props = {
  isPlaying: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  onTogglePlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  accentColor?: string;
};

export function PlaybackControls({
  isPlaying,
  canGoBack,
  canGoForward,
  onTogglePlayPause,
  onPrevious,
  onNext,
  accentColor = colors.accent,
}: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.slot}>
        <ControlButton
          label="⏮"
          disabled={!canGoBack}
          onPress={onPrevious}
        />
      </View>

      <View style={styles.slot}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
          onPress={onTogglePlayPause}
          style={[styles.mainButton, {backgroundColor: accentColor}]}>
          <Text
            style={[
              styles.mainButtonIcon,
              isPlaying ? styles.pauseIcon : styles.playIcon,
            ]}>
            {isPlaying ? PAUSE_ICON : PLAY_ICON}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.slot}>
        <ControlButton label="⏭" disabled={!canGoForward} onPress={onNext} />
      </View>
    </View>
  );
}

function ControlButton({
  label,
  disabled,
  onPress,
}: {
  label: string;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[styles.sideButton, disabled && styles.sideButtonDisabled]}>
      <Text style={styles.sideButtonIcon}>{label}</Text>
    </TouchableOpacity>
  );
}

const iconBase = {
  color: colors.textPrimary,
  textAlign: 'center' as const,
  includeFontPadding: false,
  ...(Platform.OS === 'android' ? {textAlignVertical: 'center' as const} : {}),
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  slot: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideButton: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  sideButtonDisabled: {
    opacity: 0.35,
  },
  sideButtonIcon: {
    ...iconBase,
    fontSize: 18,
    width: 24,
    lineHeight: 24,
  },
  mainButton: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  mainButtonIcon: {
    ...iconBase,
    fontSize: 24,
    width: 28,
    lineHeight: 28,
  },
  playIcon: {
    paddingLeft: 3,
  },
  pauseIcon: {
    fontSize: 22,
    width: 28,
    lineHeight: 28,
    letterSpacing: 2,
  },
});
