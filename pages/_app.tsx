import { AppStateProvider } from '../providers/app-state-context';
import { PreferenceProvider } from '../providers/preference-context';
import './_app.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppStateProvider>
      <PreferenceProvider>
        <Component {...pageProps} />
      </PreferenceProvider>
    </AppStateProvider>
  );
}

export default MyApp;
