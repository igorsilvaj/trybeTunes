import React, { useEffect, useState } from 'react';
import { Header, Loading } from '../components';
import RenderAlbums from '../components/RenderAlbums';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default function Search() {
  const [artist, setArtist] = useState('');
  const [saveArtist, setSaveArtist] = useState('');
  const [albums, setAlbums] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isBtnSearchDisabled, setIsBtnSearchDisabled] = useState(true);

  useEffect(() => {
    const minimumNameLen = 2;
    if (artist.length >= minimumNameLen) {
      return setIsBtnSearchDisabled(false);
    }
    return setIsBtnSearchDisabled(true);
  }, [artist]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section data-testid="page-search">
      {loading && <Loading />}
      <Header />
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="search-artist-input"
          value={ artist }
          onChange={ ({ target: { value } }) => setArtist(value) }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ isBtnSearchDisabled }
          onClick={ async () => {
            setLoading(true);
            setAlbums(await searchAlbumsAPI(artist));
            setSaveArtist(artist);
            setArtist('');
            setLoading(false);
          } }
        >
          Procurar
        </button>
      </form>
      { albums !== null && albums.length === 0 && <div>Nenhum álbum foi encontrado</div> }
      { albums !== null && albums.length > 0 && (
        <section>
          <div>
            <h2>
              Resultado de álbuns de:
              {' '}
              {saveArtist}
            </h2>
          </div>
          <RenderAlbums albums={ albums } />
        </section>
      )}
    </section>
  );
}
