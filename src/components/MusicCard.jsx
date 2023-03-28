import React from 'react';
import PropTypes from 'prop-types';

function MusicCard({ music }) {
  return (
    <div>
      <div>{music.trackName}</div>
      <audio data-testid="audio-component" src={ music.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento.
      </audio>
      <input type="checkbox" />
    </div>
  );
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }),
}.isRequired;

export default MusicCard;
