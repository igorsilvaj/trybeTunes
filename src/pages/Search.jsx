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
    <section
      className="flex bg-[#EFF3F9] h-screen
      sm:flex-col
      md:flex-row"
      data-testid="page-search"
    >
      {loading && <Loading />}
      <Header />
      <div className="flex flex-col flex-wrap w-full">
        <form
          className="
          flex flex-wrap justify-center items-center gap-3
          sm:flex-col
          md:flex-row
          sm:h-44 md:h-1/4
          bg-search bg-no-repeat bg-cover bg-top"
          onSubmit={ handleSubmit }
        >
          <div className="relative">
            <div
              className="absolute w-5 h-5 mt-1 top-2 right-3
              bg-mGlass filter contrast-200"
            />
            <input
              className="flex flex-row justify-between
              text-white leading-loose
              rounded-full px-5 pr-9 py-2 border border-transparent
              bg-[#ffffff80]
              placeholder:text-white placeholder:uppercase
              focus:outline-transparent
              md:w-96"
              type="text"
              data-testid="search-artist-input"
              value={ artist }
              placeholder="Digite a sua pesquisa"
              onChange={ ({ target: { value } }) => setArtist(value) }
            />
          </div>
          <button
            className="text-white font-bold uppercase leading-loose
            rounded-full px-5 py-2 border border-transparent
            bg-[#00D5E2]"
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
        { albums !== null && albums.length === 0 && (
          <div>Nenhum álbum foi encontrado</div>) }
        { albums !== null && albums.length > 0 && (
          <section className="sm:h-2/4 md:h-3/4">
            <div className="flex flex-row justify-center items-center h-28">
              <h2 className="text-[#003BE5] italic font-light text-xl">
                Resultado de álbuns de:
                {' '}
                {saveArtist}
              </h2>
            </div>
            <div
              className="
              flex flex-row justify-center items-center
              w-full overflow-auto"
            >
              <RenderAlbums albums={ albums } />
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
