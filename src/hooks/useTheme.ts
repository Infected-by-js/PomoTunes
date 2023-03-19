import {useContext} from 'react';
import {ThemeContext} from '@/core/providers/ThemeProvider';

export const useTheme = () => useContext(ThemeContext);
