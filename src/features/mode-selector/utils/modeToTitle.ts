import {capitalize} from '@/utils/strings';

export default (mode: TimerMode) => capitalize(mode.replace('_', ' '));
