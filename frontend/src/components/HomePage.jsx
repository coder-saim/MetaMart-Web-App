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




const HomePage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();

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
    dispatch(getProducts(keyword,currentPage));
  }, [dispatch, error,keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  console.log(products)
 
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
              <div className="row">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
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
