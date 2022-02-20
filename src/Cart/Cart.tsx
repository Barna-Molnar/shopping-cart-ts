import { FC } from 'react';
import styled from 'styled-components';
import { CartItemType } from '../App';
import CartItem from '../CartItem/CartItem';

export interface CartProps {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void
};

const Wrapper = styled.aside`
    font-family: Arial, Helvetica, sans-serif;
    width: 500px;
    padding: 20px;

`;

const Cart: FC<CartProps> = ({ cartItems, addToCart, removeFromCart }) => {

    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map((item => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            )))}
        </Wrapper>
    );
};

export default Cart;