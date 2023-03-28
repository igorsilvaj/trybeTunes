import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Loading } from '../components';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default function Album() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [musics, setMusics] = useState(null);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const getAlbumMusics = async () => {
      setLoading(true);
      const [header, ...music] = await getMusics(id);
      setAlbum(header);
      setMusics(music);
      setLoading(false);
    };
    getAlbumMusics();
  }, [id]);

  return (
    <div data-testid="page-album">
      <Header />
      {loading && <Loading />}
      {album && (
        <section>
          <div>
            <img src={ album.artworkUrl100 } alt="album artwork" />
            <p data-testid="album-name">{album.collectionName}</p>
            <p data-testid="artist-name">
              Artist Name:
              {' '}
              {album.artistName}
            </p>
          </div>
          <div>
            {
              musics.length > 0 && (
                musics.map((music) => (
                  <MusicCard
                    key={ music.trackId }
                    music={ music }
                  />
                )))
            }
          </div>
        </section>
      )}
    </div>
  );
}
