import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Metadata from "../layout/Metadata";

const OrderSuccess = () => {
  return (
    <Fragment>
      <Metadata title={"Order Successful"} />

      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="/images/order_success.png"
            alt="Order Success"
            width="400"
            height="400"
          />

          <h2>Your Order has been placed successfully.</h2>

          <Link to="/orders/me">Go to Orders</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
