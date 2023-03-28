import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

function MusicCard({ music }) {
  const { trackId, trackName, previewUrl } = music;
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    setLoading(true);
    await addSong(music);
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
