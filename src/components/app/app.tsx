import Layout from '@/components/app/layout';
import useAppStore from '@/store/app.store';
import { getToneJS } from '@/utils/shared.utils';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ThemeProvider from './theme-provider';

const App = () => {
  const isAudioEnabled = useAppStore((state) => state.isAudioEnabled);
  const setIsAudioEnabled = useAppStore((state) => state.setIsAudioEnabled);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const lastVisitedPage = localStorage.getItem('last-visited-page');
    if (lastVisitedPage && !location.state?.rhizome) {
      navigate(lastVisitedPage);
      return;
    }

    localStorage.setItem('last-visited-page', location.pathname);
  }, [navigate, location.pathname, location.state?.rhizome]);

  const enableAudio = async () => {
    if (isAudioEnabled) {
      return;
    }

    const Tone = await getToneJS();
    await Tone.start();

    setIsAudioEnabled(true);
    console.log('Audio enabled.');
  };

  return (
    <ThemeProvider>
      <Layout onClick={enableAudio}>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
};

export default App;