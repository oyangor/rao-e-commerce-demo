import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [firstImg, setFirstImg] = useState('');
  const [secondImg, setSecondImg] = useState('');
  const [price, setPrice] = useState(0);
  const [stars, setStars] = useState(1);

  const { token } = useSelector((state) => state.auth) // auth from authslice destructured
  //console.log(token);

  const navigate = useNavigate()

  async function handleCreateProduct(e) {
    e.preventDefault();  // Add logic to handle form submission
    try {
      //uploading the images
      const formData1 = new FormData()
      const formData2 = new FormData()

      let fileName1 = null
      let fileName2 = null

      if (firstImg && secondImg) {
        fileName1 = Date.now + firstImg.name
        fileName2 = Date.now + secondImg.name

        formData1.append('filename', fileName1)
        formData1.append('firstImg', firstImg)

        formData2.append('filename', fileName2)
        formData2.append('secondImg', secondImg)

        await fetch('http://localhost:5000/upload/firstImg', {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          method: 'POST',
          body: formData1
        })

        await fetch('http://localhost:5000/upload/secondImg', {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          method: 'POST',
          body: formData2
        })
      }
      //upload product and navigate to product

      const res = await fetch('http://localhost:5000/products/create', {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(
          {
            title,
            description,
            firstImg: fileName1,
            secondImg: fileName2,
            price,
            stars
          }
        )
      })

      //console.log(res);


      const product = await res.json()

      navigate(`/productDetail/${product?._id}`)
    } catch (e) {
      console.error(e)
    }

  }

  function handleCloseImg(numberImg) {
    if (numberImg === 'first') {
      setFirstImg('');
    } else {
      setSecondImg('');
    }
  }

  function onChangeFileFirst(e) {
    setFirstImg(e.target.files[0]);
  }

  function onChangeFileSecond(e) {
    setSecondImg(e.target.files[0]);
  }

  return (
    <div className="absolute right-0 bottom-[-500px] left-0 inset-0 z-10  flex items-center justify-center bg-aqua container ">
      <div className="bg-white p-8 rounded-md shadow-md md:w-[500px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 max-w-md">Create Product</h2>
        <form onSubmit={handleCreateProduct} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstImg">First Image:</label>
            <input type="file" name="firstImg" id="firstImg" onChange={onChangeFileFirst} className="hidden" required />
            <label htmlFor="firstImg" className="cursor-pointer text-blue-500">Upload</label>
            {firstImg && (
              <div className="flex items-center">
                <p className="mr-4 text-nowrap overflow-hidden">{firstImg.name}</p>
                <AiOutlineCloseCircle className="text-red-500 cursor-pointer" onClick={() => handleCloseImg('first')} />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="secondImg">Second Image:</label>
            <input type="file" name="secondImg" id="secondImg" onChange={onChangeFileSecond} className="hidden" />
            <label htmlFor="secondImg" className="cursor-pointer text-blue-500">Upload</label>
            {secondImg && (
              <div className="flex items-center">
                <p className="mr-4 text-nowrap overflow-hidden">{secondImg.name}</p>
                <AiOutlineCloseCircle className="text-red-500 cursor-pointer" onClick={() => handleCloseImg('second')} />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Price..." value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stars">Stars:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stars" type="number" placeholder="Stars..." min={1} max={5} step={1} value={stars} onChange={(e) => setStars(e.target.value)} required />
          </div>
          <button type="submit" className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all">Create Product</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
