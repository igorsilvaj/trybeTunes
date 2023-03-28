import { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export const MusicContext = createContext();

function MusicContextProvider({ children }) {
  const [favoriteMusics, setFavoriteMusics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setFavoriteMusics(await getFavoriteSongs());
    }
    fetchData();
  }, [favoriteMusics]);

  const contextValue = useMemo(() => (
    {
      favoriteMusics,
    }), [favoriteMusics]);

  return (
    <MusicContext.Provider value={ contextValue }>
      { children }
    </MusicContext.Provider>
  );
}

MusicContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MusicContextProvider;
