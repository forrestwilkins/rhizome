import App from '@/components/app/app';
import AudioVisual from '@/pages/audio-visual';
import CanvasPage from '@/pages/canvas-page';
import ErrorPage from '@/pages/error-page';
import HelloSound from '@/pages/hello-sound';
import HomePage from '@/pages/home-page';
import PageNotFound from '@/pages/page-not-found';
import { createBrowserRouter } from 'react-router-dom';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'hello-sound',
        element: <HelloSound />,
      },
      {
        path: 'audio-visual',
        element: <AudioVisual />,
      },
      {
        path: 'canvas',
        element: <CanvasPage />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

export default appRouter;
