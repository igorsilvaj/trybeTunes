import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function AlbumCard({ collectionId, artworkUrl100, collectionName, artistName }) {
  return (
    <Link
      to={ `/album/${collectionId}` }
      data-testid={ `link-to-album-${collectionId}` }
    >
      <img src={ artworkUrl100 } alt="album artwork" />
      <p>{collectionName}</p>
      <p>{artistName}</p>
    </Link>
  );
}

AlbumCard.propTypes = {
  collectionId: PropTypes.number,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  artistName: PropTypes.string,
}.isRequired;

export default AlbumCard;
