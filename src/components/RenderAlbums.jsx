import React from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

function RenderAlbums({ albums }) {
  return (
    <div>
      {albums.map((album, index) => (
        <div key={ `album-${index}` }>
          <AlbumCard { ...album } />
        </div>
      ))}
    </div>

  );
}

RenderAlbums.propTypes = {
  albums: PropTypes.shape,
}.isRequired;

export default RenderAlbums;
