import React, { useContext, useEffect, useState } from 'react';
import { Header, Loading } from '../components';
import MusicCard from '../components/MusicCard';
import { MusicContext } from '../context/MusicContext';

export default function Favorites() {
  const [loading, setLoading] = useState(false);
  const [musics, setMusics] = useState([]);
  const { favoriteMusics } = useContext(MusicContext);

  useEffect(() => {
    const getFavorites = async () => {
      setLoading(true);
      setMusics(favoriteMusics);
      setLoading(false);
    };
    getFavorites();
  }, [favoriteMusics]);

  return (
    <div data-testid="page-favorites">
      {loading && <Loading />}
      <Header />
      {musics.length > 0 && (
        musics.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
          />
        ))
      )}
    </div>
  );
}
