import React, { useState, useEffect } from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'Популярности',
    sortProperty: 'raiting',
  });

  useEffect(() => {
    setisLoading(true);
    fetch(
      `https://63822c13281f14ffefa1fe72.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
        sortType.sortProperty.includes('-') ? 'asc' : 'desc'
      }`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setisLoading(false);
      });
    window.scrollTo(0, 0); // При отрисовке скролл на верх
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
        <Sort sortType={sortType} onChangeSort={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
