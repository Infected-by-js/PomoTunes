import {capitalize} from '@/shared/utils';

export default (mode: TimerMode) => capitalize(mode.replace('_', ' '));
