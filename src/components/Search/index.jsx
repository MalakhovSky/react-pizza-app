import React, { useContext } from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';

export const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  return (
    <>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
    </>
  );
};
