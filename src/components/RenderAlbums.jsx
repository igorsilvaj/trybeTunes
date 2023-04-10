import React from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

function RenderAlbums({ albums }) {
  return (
    <div
      className="
      flex flex-row justify-start items-start md:gap-3 overflow-auto
      sm:gap-2 sm:w-80 md:w-[650px] lg:w-[830px] xl:w-[985px] 2xl:w-[1300px]
      scrollbar-thin scrollbar-thumb-[#00D5E2]
      scrollbar-thumb-rounded scroll-smooth"
    >
      {albums.map((album, index) => (
        <div
          key={ `album-${index}` }
          className="flex flex-col sm:h-48 md:h-64"
        >
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
