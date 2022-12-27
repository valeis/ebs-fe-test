import { Stack, Table } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/esm/Offcanvas';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import { CartItem } from './CartItem';
import React from 'react';

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, products } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end" style={{ width: '600px' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          <Table bordered hover >
            <thead>
              <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Quantity </th>
                <th>Price </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </tbody>
          </Table>
          <div className="ms-auto fw-bold fs-5">
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = products.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0),
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
