import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./checkout.module.css";

const Checkout = () => {
  const { address } = useSelector((state) => state.address);
  const { products } = useSelector((state) => state.cart);
  // console.log(Object.entries(address));

  function totalPriceProducts() {
    let totalPrice = 0;
    products.map((product) => (totalPrice += (product.price * product.quantity)));
    return totalPrice.toFixed(2);
  }

  return (
    <div className='w-[100%] h-[100%] mt-0 md:mt-[100px] mb-20   '>
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <h1 className="mb-[2px] font-semibold text-2xl border-b-2">Address Data</h1>
          <div className=''>
            {Object.entries(address).map(([key, value]) => (
              <div className={classes.info} key={key}>
                <h3 className="">{key}: </h3>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.bottom}>
          <h1 className='font-bold text-3xl ml-12 border-b-2'>Products</h1>
          <div className={classes.products}>
            {products.map((product) => (
              <div key={product.id} className={classes.product}>
                <Link to={`/productDetail/${product.id}`}>
                  <img
                    src={`https://rao-e-commerce-demo.onrender.com/images/${product?.mainImg}`}
                    className={classes.img}
                    alt={product.title}
                  />
                </Link>
                <div className={classes.priceAndTitle}>
                  <p className={classes.productTitle}>{product.title}</p>
                  <span className={classes.price}>
                    {product.quantity} x <span>$</span> {product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <span className={classes.totalPriceMsg}>
            Total price of products:{" "}
            <div className={classes.totalPrice}>${totalPriceProducts()}</div>
          </span>
        </div>
        <div className="orderBtn mb-7 ml--7 bg-amber-500 rounded-xl p-2 hover:bg-amber-300 md:absolute md:right-[60px] md:bottom-0 md:align-middle md:w-36 text-center text-nowrap">
          <Link to="/final" className='w-[100%] max-w-[200px] static top-0 right-0  '>
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
