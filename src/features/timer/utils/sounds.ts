import {AudioPlayer} from '@/shared/lib/audio-player';
import {alert_02, alert_06, buttonPress} from '@/assets/sounds';

const buttonAudio = new AudioPlayer({src: buttonPress});
const breakAudio = new AudioPlayer({src: alert_06});
const focusAudio = new AudioPlayer({src: alert_02});

export default {
  playBtnClick: () => buttonAudio.play(),
  playBreak: () => breakAudio.play(),
  playFocus: () => focusAudio.play(),
};
