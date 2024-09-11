import { Link, useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-7">
      <Link
        to="/ripples"
        state={{ rhizome: true, prev: location.pathname }}
        className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        Ripples
      </Link>

      <Link
        to="/color-grid"
        state={{ rhizome: true, prev: location.pathname }}
        className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        Color Grid
      </Link>

      <Link
        to="/modern-jungle"
        state={{ rhizome: true, prev: location.pathname }}
        className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        Modern Jungle
      </Link>

      <Link
        to="/audio-visual"
        state={{ rhizome: true, prev: location.pathname }}
        className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        Audio Visual
      </Link>

      <Link
        to="/hello-sound"
        state={{ rhizome: true, prev: location.pathname }}
        className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        Hello Sound
      </Link>
    </div>
  );
};

export default HomePage;
