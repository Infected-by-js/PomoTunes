import Navigator from '@/core/navigation/Navigator';
import {ThemeProvider} from '@/core/providers/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <Navigator />
    </ThemeProvider>
  );
};

export default App;
