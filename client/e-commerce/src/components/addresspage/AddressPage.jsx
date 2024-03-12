import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitAddress } from "../../redux/addressSlice";
import classes from './addresspage.module.css'

const AddressPage = () => {
  const [addressData, setAddressData] = useState({});
  const [errorMsg, setErrorMsg] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleState = (e) => {
    setAddressData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // check form
    const isEmpty = Object.values(addressData).some((v) => !v);
    const isFilled = Object.values(addressData).length < 5
    if (isFilled || isEmpty) {
      setErrorMsg((prev) => true);
      setTimeout(() => {
        setErrorMsg((prev) => false);
      }, 2500);
      return;
    }
    dispatch(submitAddress(addressData));
    //console.log(addressData);
    navigate("/checkout");
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1 className={classes.title}>Address and Details</h1>
        <form onSubmit={handleSubmit}>
          <input
            required
            onChange={handleState}
            name="country"
            type="text"
            placeholder="Country..."
          />
          <input
            required
            onChange={handleState}
            name="province"
            type="text"
            placeholder="Province..."
          />
          <input
            required
            onChange={handleState}
            name="city"
            type="text"
            placeholder="City..."
          />
          <input
            required
            onChange={handleState}
            name="email"
            type="email"
            placeholder="Email..."
          />
          <input
            required
            onChange={handleState}
            name="phone number"
            type="tel"
            placeholder="Phone number..."
          />
          <button type="submit" className={classes.submitBtn} style={{ background: '#141313' }}>
            Submit
          </button>

        </form>
        {errorMsg && <span className={classes.errorMsg}>All fields must filled!</span>}
      </div>
    </div>
  );
};

export default AddressPage;
