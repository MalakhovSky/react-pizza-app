import React, { useContext, useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../App';
import styles from './Search.module.scss';

export const Search = () => {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      //задержка перед запросом
      setSearchValue(str);
    }, 800),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onCLickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };
  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={onCLickClear}
          className={styles.cross}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};
