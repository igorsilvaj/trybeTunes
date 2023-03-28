import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

function MusicCard({ music }) {
  const { trackId, trackName, previewUrl } = music;
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const getFavoritedSongs = async () => {
      const favorites = await getFavoriteSongs();
      if (favorites.length > 0) {
        setFavorited(favorites.find((favorite) => favorite.trackId === trackId));
      }
    };
    getFavoritedSongs();
  }, [trackId]);

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
