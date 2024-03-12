// import React from 'react'

// import ProductCard from '../productcard/ProductCard';

// function List({ products }) {
//   //console.log(products);
//   return (
//     <div className='container mt-10'>
//       <div className='wrapper flex flex-col justify-center items-center'>
//         {products?.length > 0 && <h1 className='title text-3xl font-extrabold text-center'>Best Products in the market</h1>}
//         <div className='productsContainer flex flex-wrap w-[60%] gap-[30px] mt-[50px] '>
//           {
//             products?.length === 0
//               ? <h1 className='text-3xl font-semibold text-center w-[100%] '>No Products yet</h1>
//               : products?.map((product) => <ProductCard key={product._id} product={product} />)
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default List

// List.js
import React from 'react';
import ProductCard from '../productcard/ProductCard';

function List({ products }) {
  return (
    <div className='container mt-10'>
      <div className='wrapper flex flex-col justify-center items-center'>
        {products?.length > 0 && <h1 className='title text-3xl font-semibold text-center mb-5 border-b-2 border-b-blue'>Best Products in the market</h1>}
        <div className='productsContainer grid grid-cols-3 md:grid-cols-4'>
          {
            products?.length === 0
              ? <h1 className='text-3xl font-bolder'>No Products yet</h1>
              : products?.map((product) => <ProductCard key={product._id} product={product} />)
          }
        </div>
      </div>
    </div>
  );
}

export default List;
