import { useState } from "react";
import { useQuery } from "react-query";
// Components
import Item from "./Item/Item";
// import Cart from './Cart/Cart';
import { LinearProgress, Grid, Badge, Drawer } from "@material-ui/core/";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

// Styles
import { Wrapper, StyledButton } from "./App.styles";

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
  const data = await (await fetch("http://fakestoreapi.com/products")).json();
  return data;
};
const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  // console.log(data)
  const getTotalItems = (items: CartItemType[]) => 
  items.reduce((ack: number, item) => ack + item.amount, 0);;

  const handleAddToCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        {/* <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} /> */}
        Cart goes here...
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
