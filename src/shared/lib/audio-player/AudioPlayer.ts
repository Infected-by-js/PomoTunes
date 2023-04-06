import * as T from './types';

export class AudioPlayer implements T.AudioPlayer {
  public src: string;
  public volume: number;
  private audio: HTMLAudioElement;

  constructor({src = '', volume = 1}: T.AudioPlayerProps = {}) {
    this.src = src;
    this.volume = volume;
    this.audio = new Audio();

    this.audio.src = this.src;
    this.audio.volume = this.volume;
  }

  play() {
    if (this.audio.paused || !this.audio.currentTime) {
      this.audio.play().catch(() => {});
    }
  }

  stop() {
    this.audio.pause();
  }

  setVolume(value: number) {
    this.audio.volume = value / 100;
    return this;
  }

  setAudio(src: string) {
    this.audio.src = src;
    return this;
  }
}
