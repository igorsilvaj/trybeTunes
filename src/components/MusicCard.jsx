import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import { MusicContext } from '../context/MusicContext';
import fullHeart from '../assets/fullHeart.png';
import hollowHeart from '../assets/hollowHeart.png';
import InlineLoading from './InlineLoading';

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
    <div
      className="flex items-center
      border-b-2 p-2
      sm:w-full sm:justify-center
      md:w-[650px] md:justify-center"
    >
      <div className="w-48 truncate">{trackName}</div>
      <audio
        className="bg-white rounded-full"
        data-testid="audio-component"
        src={ previewUrl }
        controls
      >
        <track kind="captions" />
        O seu navegador não suporta o elemento.
      </audio>
      <label htmlFor={ `like${trackId}` }>
        <input
          className="hidden peer"
          type="checkbox"
          id={ `like${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ handleChange }
          checked={ favorited }
        />
        {loading
          ? <InlineLoading />
          : (
            <div
              className="block w-5 h-5 bg-center bg-contain bg-no-repeat"
              style={ { backgroundImage: `url(${favorited ? fullHeart : hollowHeart})` } }
            />
          )}
      </label>
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
