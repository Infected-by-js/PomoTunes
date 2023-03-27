import {SettingsProvider} from '@/contexts/settings';
import Navigator from '@/pages/Navigator';

const App = () => {
  return (
    <SettingsProvider>
      <Navigator />
    </SettingsProvider>
  );
};

export default App;
