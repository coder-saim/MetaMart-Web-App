import React, { Fragment, useEffect } from "react";
import "./../App.css";
import Metadata from "./layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";

const HomePage = () => {
  const dispatch = useDispatch();

  const { loading, products, productsCount } = useSelector(
    (state) => state.products
  );

  console.log(products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <Fragment>
          <div className="container container-fluid">
            <Metadata title={"Buy Best Products Online"} />
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
              <div className="row">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </section>
          </div>{" "}
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomePage;
