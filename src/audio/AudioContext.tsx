import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {fetchAudioTracks} from './audioApi';
import {AudioTrack} from './types';

type AudioContextValue = {
  tracks: AudioTrack[];
  currentTrack: AudioTrack | null;
  currentTrackIndex: number;
  isPlaying: boolean;
  isLoadingTracks: boolean;
  progress: number;
  duration: number;
  loadTracks: () => Promise<void>;
  playTrack: (track: AudioTrack) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlayPause: () => void;
  seekTo: (time: number) => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({children}: {children: React.ReactNode}) {
  const videoRef = useRef<VideoRef>(null);
  const tracksRef = useRef<AudioTrack[]>([]);
  const currentTrackRef = useRef<AudioTrack | null>(null);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingTracks, setIsLoadingTracks] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const durationRef = useRef(0);

  tracksRef.current = tracks;
  currentTrackRef.current = currentTrack;
  durationRef.current = duration;

  const playTrackAtIndex = useCallback((index: number) => {
    const nextTrack = tracksRef.current[index];
    if (!nextTrack) {
      return;
    }

    setCurrentTrack(nextTrack);
    setIsPlaying(true);
    setProgress(0);
    setDuration(0);
  }, []);

  const loadTracks = useCallback(async () => {
    setIsLoadingTracks(true);
    try {
      const fetchedTracks = await fetchAudioTracks();
      setTracks(fetchedTracks);
    } finally {
      setIsLoadingTracks(false);
    }
  }, []);

  const playTrack = useCallback((track: AudioTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
    setDuration(0);
  }, []);

  const playNext = useCallback(() => {
    const list = tracksRef.current;
    const activeTrack = currentTrackRef.current;

    if (!list.length) {
      return;
    }

    if (!activeTrack) {
      playTrackAtIndex(0);
      return;
    }

    const currentIndex = list.findIndex(track => track.id === activeTrack.id);
    if (currentIndex >= 0 && currentIndex < list.length - 1) {
      playTrackAtIndex(currentIndex + 1);
    }
  }, [playTrackAtIndex]);

  const playPrevious = useCallback(() => {
    const list = tracksRef.current;
    const activeTrack = currentTrackRef.current;

    if (!list.length || !activeTrack) {
      return;
    }

    const currentIndex = list.findIndex(track => track.id === activeTrack.id);
    if (currentIndex > 0) {
      playTrackAtIndex(currentIndex - 1);
    }
  }, [playTrackAtIndex]);

  const togglePlayPause = useCallback(() => {
    if (!currentTrackRef.current) {
      return;
    }
    setIsPlaying(prev => !prev);
  }, []);

  const seekTo = useCallback((time: number) => {
    if (!currentTrackRef.current || durationRef.current <= 0) {
      return;
    }

    const clampedTime = Math.max(0, Math.min(time, durationRef.current));
    setProgress(clampedTime);
    videoRef.current?.seek(clampedTime);
  }, []);

  const currentTrackIndex = useMemo(() => {
    if (!currentTrack) {
      return -1;
    }
    return tracks.findIndex(track => track.id === currentTrack.id);
  }, [currentTrack, tracks]);

  const value = useMemo(
    () => ({
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
    }),
    [
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
    ],
  );

  return (
    <AudioContext.Provider value={value}>
      {children}
      {currentTrack ? (
        <Video
          ref={videoRef}
          source={{
            uri: currentTrack.url,
            metadata: {
              title: currentTrack.title,
              artist: currentTrack.artist,
              imageUri: currentTrack.artwork,
            },
          }}
          paused={!isPlaying}
          playInBackground
          playWhenInactive
          ignoreSilentSwitch="ignore"
          showNotificationControls
          resizeMode="contain"
          style={styles.hiddenPlayer}
          onLoad={data => {
            setDuration(data.duration);
          }}
          onProgress={data => {
            setProgress(data.currentTime);
          }}
          onEnd={() => {
            const list = tracksRef.current;
            const activeTrack = currentTrackRef.current;

            if (!activeTrack || !list.length) {
              setIsPlaying(false);
              setProgress(0);
              return;
            }

            const currentIndex = list.findIndex(
              track => track.id === activeTrack.id,
            );

            if (currentIndex >= 0 && currentIndex < list.length - 1) {
              playTrackAtIndex(currentIndex + 1);
              return;
            }

            setIsPlaying(false);
            setProgress(0);
          }}
          onError={error => {
            console.warn('Audio playback error', error);
            setIsPlaying(false);
          }}
        />
      ) : null}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}

const styles = StyleSheet.create({
  hiddenPlayer: {
    width: 0,
    height: 0,
    position: 'absolute',
    opacity: 0,
  },
});
