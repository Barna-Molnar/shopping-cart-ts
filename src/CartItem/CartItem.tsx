import { FC, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { CartItemType } from '../App'

export interface CartItemProps {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void
};

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: Arial, Helvetica, sans-serif;
    border-bottom: 1px solid lightblue;
    padding-bottom: 20px;

    div {
        flex: 1;
    }

    .buttons, .information {
        display: flex;
        justify-content: space-between;
    }

    img {
        width: 80px;
        object-fit: cover;
        margin-left: 40px;
    }
`;

const CartItem: FC<CartItemProps> = ({ item, addToCart, removeFromCart }) => {

    return (
        <Wrapper>
            <div>
                <h3>{item.title}</h3>
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
                        -
                    </Button>
                    <p>{item.amount}</p>
                    <Button
                        size='small'
                        disableElevation
                        variant='contained'
                        onClick={() => addToCart(item)}
                    >
                        +
                    </Button>
                </div>
            </div>
            <img src={item.image} alt={item.title} />
        </Wrapper>
    );
};

export default CartItem;