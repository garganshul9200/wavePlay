import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AlbumArtwork} from '../components/AlbumArtwork';
import {PlaybackControls} from '../components/PlaybackControls';
import {ProgressBar} from '../components/ProgressBar';
import {ScreenBackground} from '../components/ScreenBackground';
import {useAudio} from '../audio/AudioContext';
import {AudioTrack} from '../audio/types';
import {
  colors,
  getTrackAccent,
  radius,
  spacing,
  typography,
} from '../theme';
import {formatTime} from '../utils/formatTime';

export function PlayerScreen() {
  const {
    tracks,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    isLoadingTracks,
    progress,
    duration,
    loadTracks,
    playTrack,
    playNext,
    playPrevious,
    togglePlayPause,
    seekTo,
  } = useAudio();

  useEffect(() => {
    if (tracks.length === 0) {
      loadTracks();
    }
  }, [loadTracks, tracks.length]);

  const accentColor =
    currentTrackIndex >= 0
      ? getTrackAccent(currentTrackIndex)
      : colors.accentLight;

  const renderTrack = ({item, index}: {item: AudioTrack; index: number}) => {
    const isActive = currentTrack?.id === item.id;
    const itemAccent = getTrackAccent(index);

    return (
      <Pressable
        onPress={() => playTrack(item)}
        style={({pressed}) => [
          styles.trackRow,
          isActive && styles.trackRowActive,
          pressed && styles.trackRowPressed,
        ]}>
        <View
          style={[
            styles.trackIndexBadge,
            {backgroundColor: `${itemAccent}22`, borderColor: `${itemAccent}55`},
          ]}>
          <Text style={[styles.trackIndexText, {color: itemAccent}]}>
            {String(index + 1).padStart(2, '0')}
          </Text>
        </View>
        <View style={styles.trackInfo}>
          <Text
            numberOfLines={1}
            style={[styles.trackTitle, isActive && {color: itemAccent}]}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.trackMeta}>
            {item.artist}
            {item.genre ? ` · ${item.genre}` : ''}
          </Text>
        </View>
        <View style={styles.trackStatus}>
          {isActive && isPlaying ? (
            <View style={[styles.liveDot, {backgroundColor: itemAccent}]} />
          ) : (
            <Text style={styles.playHint}>▶</Text>
          )}
        </View>
      </Pressable>
    );
  };

  const listHeader = (
    <>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Now Playing</Text>
          <Text style={styles.header}>Player</Text>
        </View>
        <View style={styles.livePill}>
          <View style={styles.livePillDot} />
          <Text style={styles.livePillText}>
            {isPlaying ? 'Live' : 'Ready'}
          </Text>
        </View>
      </View>

      <View style={styles.nowPlayingCard}>
        <AlbumArtwork
          accentColor={accentColor}
          isPlaying={isPlaying}
          label={currentTrack ? '♪' : '♫'}
        />

        <Text numberOfLines={2} style={styles.nowPlayingTitle}>
          {currentTrack?.title ?? 'Choose a track'}
        </Text>
        <Text numberOfLines={1} style={styles.nowPlayingArtist}>
          {currentTrack?.artist ?? 'Select from the queue below'}
        </Text>

        <View style={styles.progressContainer}>
          <ProgressBar
            progress={progress}
            duration={duration}
            accentColor={accentColor}
            disabled={!currentTrack || duration <= 0}
            onSeek={seekTo}
          />
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(progress)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        <PlaybackControls
          isPlaying={isPlaying}
          canGoBack={currentTrackIndex > 0}
          canGoForward={
            currentTrackIndex >= 0 && currentTrackIndex < tracks.length - 1
          }
          onTogglePlayPause={togglePlayPause}
          onPrevious={playPrevious}
          onNext={playNext}
          accentColor={accentColor}
        />
      </View>

      <View style={styles.listHeaderRow}>
        <Text style={styles.listHeader}>Queue</Text>
        <Text style={styles.listCount}>{tracks.length} tracks</Text>
      </View>

      {isLoadingTracks ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator color={colors.accentLight} size="large" />
          <Text style={styles.loaderText}>Loading tracks...</Text>
        </View>
      ) : null}
    </>
  );

  return (
    <ScreenBackground accentColor={accentColor}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <FlatList
          data={isLoadingTracks ? [] : tracks}
          keyExtractor={item => item.id}
          renderItem={renderTrack}
          ListHeaderComponent={listHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  eyebrow: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: 4,
  },
  header: {
    ...typography.title,
    color: colors.textPrimary,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  livePillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  livePillText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  nowPlayingCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nowPlayingTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.4,
    marginTop: spacing.sm,
  },
  nowPlayingArtist: {
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  timeText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  listHeader: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  listCount: {
    ...typography.caption,
    color: colors.textMuted,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  trackRowActive: {
    backgroundColor: colors.surfaceHighlight,
    borderColor: colors.borderActive,
  },
  trackRowPressed: {
    opacity: 0.85,
  },
  trackIndexBadge: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    borderWidth: 1,
  },
  trackIndexText: {
    fontSize: 13,
    fontWeight: '800',
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  trackMeta: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  trackStatus: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  playHint: {
    color: colors.textMuted,
    fontSize: 14,
  },
  loaderWrap: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  loaderText: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
