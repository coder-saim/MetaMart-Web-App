import React, { Fragment, useEffect, useState } from "react";
import "./../App.css";
import Metadata from "./layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loading from "./layout/Loading";
import Pagination from "react-js-pagination";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Slider from 'react-slider'

const HomePage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [values,setValues] = useState([1,1000]);

  const { loading, products, productsCount, error, resPerPage } = useSelector(
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
      dispatch(clearErrors());
      return;
    }
    dispatch(getProducts(keyword, currentPage,values));
  }, [dispatch, error, keyword, currentPage, values]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  console.log(products + '  ' + values);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Metadata title={"Buy Best Products Online"} />
          <div className="container container-fluid">
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
            <h5>Filter Products</h5>
              <div className="row">
                
                {keyword ? (
                  <Fragment>
                    <div className="col-6 col-md-3 mt-5 mb-5">
                      <div className="px-5" style={{ cursor: "pointer" }}>
                        <h6 className="text-center">Range {values[0]} to {values[1]}</h6>
                        <Slider
                          className="slider"
                          onChange={setValues}
                          value={values}
                          min='1'
                          max='1000'
                        />
                      </div>
                    </div>

                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  products.map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))
                )}
              </div>
            </section>
          </div>{" "}
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default HomePage;
