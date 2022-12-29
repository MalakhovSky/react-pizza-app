import React, {useCallback, useEffect} from 'react';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { useSelector} from 'react-redux';
import { Pagination } from '../components/Pagination';
import { useAppDistatch } from '../redux/store';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { selectFilter, selectSortProperty } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategiryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { Status } from '../redux/pizza/types';

export const Home: React.FC = () => {
  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = useSelector(selectSortProperty);

  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useAppDistatch();

  const onChangePage = (number:number) => {
    dispatch(setCurrentPage(number));
  };


  const onChangeCategory = useCallback( (id:number) => {
    dispatch(setCategiryId(id));
  },[])

  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
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
      {status === Status.ERROR ? (
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
        <div className="content__items">{status === Status.LOADING ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
