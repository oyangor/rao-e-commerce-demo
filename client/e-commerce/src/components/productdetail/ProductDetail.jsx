import React, { useEffect } from "react";
import { BsCartFill } from "react-icons/bs";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { GiScales } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import { useParams } from "react-router-dom";
import numToStars from "../../helpers/numToStars.jsx";


const ProductDetail = () => {
  const [product, setProduct] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [quantityProduct, setQuantityProduct] = useState(1);
  const products = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const { id } = useParams();

  //console.log(products);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        const data = await res.json();
        setProduct((prev) => data);
        setCurrentImage((prev) => data.firstImg);
        //console.log(product);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const addQuantity = () => {
    setQuantityProduct((prev) => prev + 1);
  };

  const removeQuantity = () => {
    setQuantityProduct((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const addProductToCart = () => {
    dispatch(
      addProduct({
        quantity: quantityProduct,
        title: product.title,
        desc: product?.desc,
        price: product?.price,
        id: product?._id,
        mainImg: product?.firstImg,
      })
    );
    setQuantityProduct((prev) => 1);
  };

  return (
    <div className=' py-4 px-10 pb-16 w-full h-screen-[105px] mb-[50px] bg-slate-300 '>
      <div className='h-full w-70% my-auto mx-auto flex justify-center gap-[100px]'>
        <div className='flex flex-1 gap-[25px]'>
          <div className='flex justify-center items-center'>
            <img
              src={`http://localhost:5000/images/${currentImage}`}
              className='h-[400px] w-[400px] object-cover rounded-lg'
              alt=""
            />
          </div>
        </div>
        <div className='flex flex-1 flex-col'>
          <h2 className='text-2xl font-medium mb-[30px]'>{product?.title}</h2>
          <p className='text-[18px] text-gray-500 font-medium text-justify mb-[30px]'>{product?.desc}</p>
          <h2 className='text-blue-700 text-[22px] font-bold ml-[50px]'>
            <span className='text-[22px] font-bold'>$</span> {product?.price}
          </h2>
          <div className='my-1.5rem mx-0 flex items-center gap-[10px]'>
            <button onClick={removeQuantity} className='h-[30px] w-[30px]  border border-solid border-gray-700 outline-none cursor-pointer bg-transparent text-green-600 font-[20px] hover:bg-gray-300'>
              -
            </button>
            <span className='mx-1rem my-0 text-[20px] font-medium'>Quantity: {quantityProduct}</span>
            <button onClick={addQuantity} className='h-[30px] w-[30px] border border-solid border-gray-700 outline-none cursor-pointer bg-transparent text-green-600 font-[20px] hover:bg-gray-300'>
              +
            </button>
          </div>
          <div className='flex justify-center items-center gap-[20px] py-0.5rem px-1rem bg-indigo-600 text-white w-[200px] hover:border-indigo-600 hover:bg-slate-300 hover:text-indigo-600 hover:cursor-pointer rounded-[6px] border border-solid border-transparent mt-5 mx-0 mb-4' onClick={addProductToCart}>
            <BsCartFill className='hover:bg-slate-300' />
            ADD TO CART
          </div>
          <div className='flex items-center gap-3 text-[18px]'>
            <AiFillHeart />
            ADD TO WISHLIST
          </div>
          {product?.stars && (
            <div className='mt-[30px] flex items-center gap-7'>
              <span className='text-[22px] font-medium capitalize'>Review: </span>
              <div className='flex items-center'>{numToStars(product.stars)}<span style={{ marginLeft: "4px", fontWeight: 'normal', fontSize: '18px' }}>(14)</span></div>
            </div>
          )}
          <div className='flex gap-[25px]'>
            <img
              src={`http://localhost:5000/images/${product?.firstImg}`}
              className='h-[100px] w-[100px] object-cover cursor-pointer mt-[30px]  bg-slate-300 rounded-lg'
              alt=""
              onClick={() => setCurrentImage((prev) => product?.firstImg)}
            />
            <img
              src={`http://localhost:5000/images/${product?.secondImg}`}
              className='h-[100px] w-[[100px]] object-cover cursor-pointer mt-[30px]  bg-slate-300 rounded-lg'
              alt=""
              onClick={() => setCurrentImage((prev) => product?.secondImg)}
            />
          </div>
          <div className='mt-[30px]'>
            <hr className="w-[400px] text-gray-500 my-[0.75rem] mx-0" />
            <p className="font-medium ml-[10px] uppercase text-gray-900  my-[40px] mx-0">Materials and maintenaince</p>
            <hr />
            <p className="font-medium ml-[10px] uppercase text-gray-900">What is the product about</p>
            <hr />
            <p className="font-medium ml-[10px] uppercase text-gray-900">Help and Contacts</p>
            <hr />
            <p className="font-medium ml-[10px] uppercase text-gray-900">FAQ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;