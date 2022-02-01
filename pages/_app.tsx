import { AppStateProvider } from '../providers/app-state-context';
import { PreferenceProvider } from '../providers/preference-context';
import { MediaContextProvider } from '../providers/media';
import './_app.css';

function MyApp({ Component, pageProps }) {
  return (
    <MediaContextProvider>
      <AppStateProvider>
        <PreferenceProvider>
          <Component {...pageProps} />
        </PreferenceProvider>
      </AppStateProvider>
    </MediaContextProvider>
  );
}

export default MyApp;
