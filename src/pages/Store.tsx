import { Button, Col, Row, Table } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { StoreItem } from '../components/StoreItem';
// import storeItems from '../data/items.json';
import React, { useEffect, useState } from 'react';

type Product = {
  imgUrl: string;
  id: number;
  name: string;
  category: Category;
  price: number;
};

type Category = {
  id: string;
  name: string;
};

function renderTable(products: Product[]) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const quantity = getItemQuantity(product.id);
          return (
            <tr>
              <td>{product.category.name}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <div className="mt-auto">
                  {quantity === 0 ? (
                    <Button className="w-100 btn-secondary " onClick={() => increaseCartQuantity(product.id)}>
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="d-flex align-items-center flex-column " style={{ gap: '.5rem' }}>
                      <div className="d-flex align-items-center justify-content-center" style={{ gap: '.5rem' }}>
                        <Button className="btn btn-dark" onClick={() => decreaseCartQuantity(product.id)}>
                          -
                        </Button>
                        <div>
                          <span className="fs-3">{quantity}</span>
                          in cart
                        </div>
                        <Button className="btn btn-light" onClick={() => increaseCartQuantity(product.id)}>
                          +
                        </Button>
                      </div>
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(product.id)}>
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export function Store() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    return fetch('http://localhost:3001/api/products/')
      .then((response) => response.json())
      .then((products) => setProducts(products));
  };

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-1">
        {/* {products.map((item) => {
          return (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          );
        })} */}

        {renderTable(products)}
      </Row>
    </>
  );
}
