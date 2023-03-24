import Navigator from '@/core/navigation/Navigator';
import {SettingsProvider} from './core/providers/SettingsProvider';

const App = () => {
  return (
    <SettingsProvider>
      <Navigator />
    </SettingsProvider>
  );
};

export default App;
