import React, { useEffect, memo } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectFilter, setCategiryId, setCurrentPage,selectSortProperty } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';

export const Home: React.FC = () => {
  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = useSelector(selectSortProperty);

  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useDispatch();

  const onChangePage = (number:number) => {
    dispatch(setCurrentPage(number));
  };

  const onChangeCategory = (id:number) => {
    dispatch(setCategiryId(id));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
    // При отрисовке скролл на верх
  };
  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj:any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <h2>
            Произошла ошибка <div>😕</div>
          </h2>
          <p>
            Не удалось найти пиццу.
            <br />
            Попробуйте снова позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
