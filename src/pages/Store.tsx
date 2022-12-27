import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Category, Product, useShoppingCart } from '../context/ShoppingCartContext';
import React, { useEffect, useMemo, useState } from 'react';


export function Store() {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, products } = useShoppingCart();
  const [storeProducts, setStoreProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    return fetch('http://localhost:3001/api/product/categories/')
      .then((response) => response.json())
      .then((categories) => setCategories(categories));
  };

  useEffect(() => {
    setStoreProducts(products.sort((a, b) => (a.price < b.price ? 1 : -1)));
  }, [products]);  

  const [order, setOrder] = useState('asc');

  const sorting = (field) => {
    if (order === 'asc') {
      const sorted = [...storeProducts].sort((a, b) => (a[field] > b[field] ? 1 : -1));
      setStoreProducts(sorted);
      setOrder('desc');
    }
    if (order === 'desc') {
      const sorted = [...storeProducts].sort((a, b) => (a[field] < b[field] ? 1 : -1));
      setStoreProducts(sorted);
      setOrder('asc');
    }
  };
 
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function getFilteredList(){
    if(!selectedCategory){
      return storeProducts;
    }
    return storeProducts.filter((item) => item.category.id === selectedCategory);
  }

  var filteredList = useMemo(getFilteredList, [selectedCategory, storeProducts]);


  return (
    <>
      <div className="filter-container">
        <Row>
          <Col xs={12} md={5}>
            <div className="d-flex justify-content-start"><b>Filter by Category:</b></div>
            <div>
              <Form.Select name="category-list" id="category-list" onChange={handleCategoryChange}>
                <option value="">All</option>
                {categories.map(it=>( <option key={it.id} value={it.id}>{it.name}</option>))}
              </Form.Select>
            </div>
          </Col>
        </Row>
      </div>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-1">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th onClick={() => sorting('price')}>
                Price  <span style={{cursor:'pointer'}}>{order === 'desc'?'↑':'↓'}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((product, item) =>  {
              const quantity = getItemQuantity(product.id);
              return (
                <tr key={product.id}>
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
      </Row>
    </>
  );
}
