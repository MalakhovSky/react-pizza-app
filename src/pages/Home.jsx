import React, { useState, useEffect } from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';

export const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [curentPage, setCurentPage] = useState(1); //Номер страниц
  const [sortType, setSortType] = useState({
    name: 'Популярности',
    sortProperty: 'raiting',
  });

  useEffect(() => {
    setisLoading(true);
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://63822c13281f14ffefa1fe72.mockapi.io/items?page=${curentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setisLoading(false);
      });
    window.scrollTo(0, 0); // При отрисовке скролл на верх
  }, [categoryId, sortType, searchValue, curentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
        <Sort sortType={sortType} onChangeSort={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurentPage(number)} />
    </div>
  );
};
