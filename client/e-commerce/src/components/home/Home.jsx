import React, { useEffect, useState } from 'react'
import List from '../list/List'

function Home() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchproducts() {
      try {
        const res = await fetch('http://localhost:5000/products')
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        setError(error.message)

      }
    }
    fetchproducts()
  }, [])

  return (
    <div>
      {
        !error && <List products={products ? products : []} />
      }
      {
        error && <h1>No products!</h1>
      }
    </div>
  )
}

export default Home