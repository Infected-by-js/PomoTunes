import {useContext} from 'react';
import {SettingsContext} from '@/core/providers/SettingsProvider';

export const useSettings = () => useContext(SettingsContext);
