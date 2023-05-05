import {AudioPlayer} from '@/shared/lib/audio-player';
import {SOUNDS} from '@/shared/utils/constants';

//* set here to avoid refetch audio
const buttonAudio = new AudioPlayer({src: SOUNDS.BUTTON_PRESS});
const breakAudio = new AudioPlayer({src: SOUNDS.SOUND_1});
const focusAudio = new AudioPlayer({src: SOUNDS.BELL});

export default {
  playBtnClick: () => buttonAudio.play(),
  playBreak: () => breakAudio.play(),
  playFocus: () => focusAudio.play(),
};
