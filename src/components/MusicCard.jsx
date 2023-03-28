import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import { MusicContext } from '../context/MusicContext';

function MusicCard({ music }) {
  const { trackId, trackName, previewUrl } = music;
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const { favoriteMusics } = useContext(MusicContext);

  useEffect(() => {
    const getFavoritedSongs = async () => {
      if (favoriteMusics.length > 0) {
        setFavorited(favoriteMusics.find((favorite) => favorite.trackId === trackId));
      }
    };
    getFavoritedSongs();
  }, [trackId, favoriteMusics]);

  const handleChange = async () => {
    setLoading(true);

    if (favorited) {
      await removeSong(music);
    } else {
      await addSong(music);
    }

    setFavorited(!favorited);
    setLoading(false);
  };

  return (
    <div>
      {loading && <Loading />}
      <div>{trackName}</div>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento.
      </audio>
      <input
        type="checkbox"
        data-testid={ `checkbox-music-${trackId}` }
        onChange={ handleChange }
        checked={ favorited }
      />
    </div>
  );
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }),
}.isRequired;

export default MusicCard;
