export interface AudioPlayer {
  play(): void;
  stop(): void;
  setVolume(value: number): AudioPlayer;
  setAudio(src: string): AudioPlayer;
}

export interface AudioPlayerProps {
  src?: string;
  volume?: number;
}
