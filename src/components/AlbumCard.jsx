import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function AlbumCard({ collectionId, artworkUrl100, collectionName, artistName }) {
  return (
    <Link
      className="sm:w-40 md:w-52"
      to={ `/album/${collectionId}` }
      data-testid={ `link-to-album-${collectionId}` }
    >
      <div
        className="sm:w-36 sm:h-36 md:w-52 md:h-52 bg-no-repeat bg-cover rounded-lg"
        style={ { backgroundImage: `url(${artworkUrl100})` } }
      />
      {/* <img src={ artworkUrl100 } alt="album artwork" /> */}
      <p className="text-[#3D495C] text-base font-bold truncate ">{collectionName}</p>
      <p className="text-[#3D495C] text-sm font-normal truncate ">{artistName}</p>
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
