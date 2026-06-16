import {AudioTrack} from './types';

const MOCK_TRACKS: AudioTrack[] = [
  {
    id: '1',
    title: 'Midnight Echoes',
    artist: 'SoundHelix',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Ambient',
  },
  {
    id: '2',
    title: 'Neon Horizon',
    artist: 'SoundHelix',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Electronic',
  },
  {
    id: '3',
    title: 'Golden Pulse',
    artist: 'SoundHelix',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Lo-fi',
  },
];

export async function fetchAudioTracks(): Promise<AudioTrack[]> {
  await new Promise<void>(resolve => {
    setTimeout(resolve, 500);
  });

  return MOCK_TRACKS;
}
