import { FC } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { CartItemType } from '../App'

export interface CartItemProps {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void
};

const Wrapper = styled.div``;

const CartItem: FC<CartItemProps> = ({ item, addToCart, removeFromCart }) => {

    return (
        <Wrapper>
            <div>
                <h3>{item.title}</h3>
            </div>
            <div className="information">
                <p>Price ${item.price}</p>
                <p>Total: ${(item.amount * item.price).toFixed(2)}</p>

            </div>
            <div className="buttons">
                <Button
                    size='small'
                    disableElevation
                    variant='contained'
                    onClick={() => removeFromCart(item.id)}
                >
                    +
                </Button>
                <Button
                    size='small'
                    disableElevation
                    variant='contained'
                    onClick={() => addToCart(item)}
                >
                    -
                </Button>
            </div>
            <img src={item.image} alt={item.title} />
        </Wrapper>
    );
};

export default CartItem;