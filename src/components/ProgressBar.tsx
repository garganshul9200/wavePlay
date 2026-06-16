import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import {colors, radius} from '../theme';

type Props = {
  progress: number;
  duration: number;
  accentColor?: string;
  disabled?: boolean;
  onSeek?: (time: number) => void;
};

export function ProgressBar({
  progress,
  duration,
  accentColor = colors.accentLight,
  disabled = false,
  onSeek,
}: Props) {
  const trackWidth = useRef(0);
  const durationRef = useRef(duration);
  const onSeekRef = useRef(onSeek);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  durationRef.current = duration;
  onSeekRef.current = onSeek;

  const getTimeFromLocationX = useCallback((locationX: number) => {
    if (durationRef.current <= 0 || trackWidth.current <= 0) {
      return 0;
    }

    const ratio = Math.max(0, Math.min(locationX / trackWidth.current, 1));
    return ratio * durationRef.current;
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () =>
          !disabled && durationRef.current > 0 && Boolean(onSeekRef.current),
        onMoveShouldSetPanResponder: () =>
          !disabled && durationRef.current > 0 && Boolean(onSeekRef.current),
        onPanResponderGrant: event => {
          setIsSeeking(true);
          setSeekValue(getTimeFromLocationX(event.nativeEvent.locationX));
        },
        onPanResponderMove: event => {
          setSeekValue(getTimeFromLocationX(event.nativeEvent.locationX));
        },
        onPanResponderRelease: event => {
          const time = getTimeFromLocationX(event.nativeEvent.locationX);
          setIsSeeking(false);
          setSeekValue(time);
          onSeekRef.current?.(time);
        },
        onPanResponderTerminate: () => {
          setIsSeeking(false);
        },
      }),
    [disabled, getTimeFromLocationX],
  );

  const displayedProgress = isSeeking ? seekValue : progress;
  const percentage =
    duration > 0 ? Math.min((displayedProgress / duration) * 100, 100) : 0;

  const onTrackLayout = (event: LayoutChangeEvent) => {
    trackWidth.current = event.nativeEvent.layout.width;
  };

  return (
    <View
      style={styles.touchArea}
      {...panResponder.panHandlers}
      onLayout={onTrackLayout}>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {width: `${percentage}%`, backgroundColor: accentColor},
          ]}
        />
        <View
          style={[
            styles.thumb,
            {
              left: `${percentage}%`,
              backgroundColor: accentColor,
              shadowColor: accentColor,
              opacity: disabled ? 0.4 : 1,
            },
            isSeeking && styles.thumbActive,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  touchArea: {
    paddingVertical: 14,
    justifyContent: 'center',
  },
  track: {
    height: 6,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: radius.full,
    overflow: 'visible',
    position: 'relative',
  },
  fill: {
    height: '100%',
    borderRadius: radius.full,
  },
  thumb: {
    position: 'absolute',
    top: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -8,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  thumbActive: {
    transform: [{scale: 1.2}],
  },
});
