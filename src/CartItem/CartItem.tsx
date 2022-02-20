import { FC } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { CartItemType } from '../App'

export interface CartItemProps {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void
};

const DIV = styled.div``;

const CartItem: FC<CartItemProps> = (props) => {

    return (
        <DIV>

        </DIV>
    );
};

export default CartItem;