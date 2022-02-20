import { useState } from 'react'
import { useQuery } from 'react-query'

import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import Item from './Item/Item'
import Cart from './Cart/Cart'

import { Wrapper, StyledButton } from './App.styles'

export type CartItemType = {
  id: number;
  category: string;
  image: string;
  description: string
  price: number;
  title: string;
  amount: number;

}

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products/')).json()
}






const App = () => {

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItemType[]>([])

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((acc: number, item) => acc + item.amount, 0)
  }
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // is the item already add in the cart ?
      const isItemInTheCart = prev.find(item => item.id === clickedItem.id)

      if (isItemInTheCart) {
        return prev.map(item => (
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        ))
      }
      // First time is the item is added 
      return [...prev, { ...clickedItem, amount: 1 }]
    })
  }
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => {

      const isAmountOne = prev.find(item => item.id === id)?.amount === 1

      if (isAmountOne) {
        return prev.filter(item => item.id !== id)
      }

      return prev.map(item => {
        return item.id === id
          ? { ...item, amount: item.amount - 1 }
          : item
      })
    })
  }

  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong</div>


  return (
    <Wrapper>
      <Drawer anchor='right' open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setIsCartOpen(true)} >
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
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
}

export default App;
