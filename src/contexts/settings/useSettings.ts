import {useContext} from 'react';
import {SettingsContext} from '@/contexts/settings';

export const useSettings = () => useContext(SettingsContext);
