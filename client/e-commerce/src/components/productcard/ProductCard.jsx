import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <div className='container cursor-pointer shadow-lg p-4 transition-all hover:transform ' >
      <Link to={`/productDetail/${product._id}`} className='wrapper '>
        <img src={`http://localhost:5000/images/${product.firstImg}`} alt={product.title} className='productImg h-[250px] min-w-[100%] object-cover w-auto ' />
        <div className="prductInfo">
          <h2 className="productTitle text-2xl font-medium mt-3 capitalize">{product.title}</h2>
          <span className="productPrice text-blue-600 text-[18px] ">${Number(product.price).toFixed(2)}</span>

        </div>
      </Link>
    </div>
  )
}

export default ProductCard