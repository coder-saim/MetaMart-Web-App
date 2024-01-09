import React, { Fragment, useEffect } from "react";
import "./../App.css";
import Metadata from "./layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loading from "./layout/Loading";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      toast("Something went wrong!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    dispatch(getProducts());
  }, [dispatch,error]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
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
      <ToastContainer />
    </Fragment>
  );
};

export default HomePage;
