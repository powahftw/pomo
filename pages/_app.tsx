import { PreferenceProvider } from '../providers/preference-context';
import './_app.css';

function MyApp({ Component, pageProps }) {
  return (
    <PreferenceProvider>
      <Component {...pageProps} />
    </PreferenceProvider>
  );
}

export default MyApp;
