import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const FullPizza :React.FC= () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl:string,
    title: string,
    price: number,
  }>();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`https://63822c13281f14ffefa1fe72.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        console.log(error, 'получение пиццы ERROR (FullPizza)');
      }
    }
    fetchData();
  }, []);

  if (!pizza) {
    return <>'Загрузка...'</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};
