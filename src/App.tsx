import {SettingsProvider} from '@/contexts/settings';
import Main from '@/pages/Main';

const App = () => {
  return (
    <SettingsProvider>
      <Main />
    </SettingsProvider>
  );
};

export default App;
