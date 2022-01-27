import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
// import Item from './Item/Item';
// import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton } from './App.styles';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
 const data = await (await fetch('http://fakestoreapi.com/products')).json()
 return data
}
const App = () => {

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)

  // console.log(data)
  return (
    <div className='App'>Shopping Cart App</div>
  );
}

export default App;
