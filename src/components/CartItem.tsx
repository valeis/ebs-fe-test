import { Button } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import React from 'react';

type CartItemProps = {
  id: number;
  quantity: number;
};

const cellStyles={verticalAlign: 'middle', textAlign: "center"} as any;

export function CartItem({ id, quantity }: CartItemProps) {
  const { increaseCartQuantity, decreaseCartQuantity, products } = useShoppingCart();
  const item = products.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <tr>
      <td style={cellStyles}>{item?.category.name}</td>
      <td style={cellStyles}>{item?.name}</td>
      <td style={cellStyles}>{quantity}</td>
      <td style={cellStyles}>{formatCurrency(item.price * quantity)}</td>
      <td style={{...cellStyles, display:'flex'}}>
        <Button as='span'
          className="btn btn-dark"
          onClick={() => decreaseCartQuantity(item.id)}
          style={{ width: '36px', height: '36px', lineHeight: '18px', display: 'grid' }}
        >
          -
        </Button>
        &nbsp;
        <Button as='span'
          className="btn btn-light"
          onClick={() => increaseCartQuantity(item.id)}
          style={{ width: '36px', height: '36px', lineHeight: '18px', display: 'grid' }}
        >
          +
        </Button>
      </td>
    </tr>
  );
}
