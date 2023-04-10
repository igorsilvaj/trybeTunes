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
    <section
      className="flex bg-[#EFF3F9]
      sm:flex-col
      md:flex-row md:h-screen"
      data-testid="page-album"
    >
      <Header />
      {loading && <Loading />}
      {album && (
        <section className="flex flex-col md:w-3/4">
          <div
            className="flex flex-row
            bg-search bg-no-repeat bg-cover
            sm:h-36 sm:px-4 sm:py-2 sm:gap-2
            md:justify-start md:h-1/3 md:px-20 md:gap-8"
          >
            <img
              className="rounded-md
              sm:w-32 sm:h-32
              md:w-56 md:h-56 md:translate-y-2 md:shadow-lg md:shadow-black"
              src={ album.artworkUrl100 }
              alt="album artwork"
            />
            <div className="self-end text-white w-3/5">
              <p className="truncate" data-testid="album-name">
                Album:
                {' '}
                {album.collectionName}
              </p>
              <p className="truncate" data-testid="artist-name">
                Artist:
                {' '}
                {album.artistName}
              </p>
            </div>
          </div>
          <div
            className="flex flex-col items-center
            md:gap-5 md:pt-10 md:overflow-auto
            "
          >
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
    </section>
  );
}
