import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {useAudio} from '../audio/AudioContext';
import {RootTabParamList} from '../navigation/types';
import {colors, getTrackAccent, radius, spacing, typography} from '../theme';
import {PAUSE_ICON, PLAY_ICON} from '../theme/icons';

export function MiniPlayerBar() {
  const navigation =
    useNavigation<BottomTabNavigationProp<RootTabParamList>>();
  const {currentTrack, currentTrackIndex, isPlaying, togglePlayPause} =
    useAudio();

  if (!currentTrack) {
    return null;
  }

  const accentColor =
    currentTrackIndex >= 0
      ? getTrackAccent(currentTrackIndex)
      : colors.accentLight;

  const openPlayer = () => {
    navigation.navigate('Player');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.accentStrip, {backgroundColor: accentColor}]} />
      <View style={styles.contentRow}>
        <Pressable style={styles.infoArea} onPress={openPlayer}>
          <View
            style={[
              styles.artwork,
              {backgroundColor: `${accentColor}22`, borderColor: `${accentColor}55`},
            ]}>
            <Text style={[styles.artworkText, {color: accentColor}]}>♪</Text>
          </View>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {currentTrack.title}
            </Text>
            <Text numberOfLines={1} style={styles.artist}>
              {currentTrack.artist}
            </Text>
          </View>
        </Pressable>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
          onPress={togglePlayPause}
          style={[styles.controlButton, {backgroundColor: accentColor}]}>
          <Text
            style={[
              styles.controlIcon,
              isPlaying ? styles.pauseIcon : styles.playIcon,
            ]}>
            {isPlaying ? PAUSE_ICON : PLAY_ICON}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.miniPlayer,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    overflow: 'hidden',
  },
  accentStrip: {
    height: 2,
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  infoArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  artwork: {
    width: 46,
    height: 46,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    borderWidth: 1,
  },
  artworkText: {
    fontSize: 20,
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.caption,
    color: colors.textPrimary,
    fontSize: 14,
  },
  artist: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  controlButton: {
    width: 46,
    height: 46,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  controlIcon: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    includeFontPadding: false,
    ...(Platform.OS === 'android' ? {textAlignVertical: 'center'} : {}),
  },
  playIcon: {
    width: 18,
    lineHeight: 18,
    paddingLeft: 2,
  },
  pauseIcon: {
    width: 22,
    lineHeight: 20,
    fontSize: 16,
    letterSpacing: 1,
  },
});
