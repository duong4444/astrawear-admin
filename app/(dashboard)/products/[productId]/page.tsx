/* eslint-disable react-hooks/exhaustive-deps */
"use client"

// product detail - "/products/id"
import Loader from '@/components/custom-ui/Loader'
import ProductForm from '@/components/products/ProductForm'
import React, { useEffect, useState } from 'react'

const ProductDetails = ({ params }: { params: { productId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [productDetails, setProductDetails] = useState<ProductType | null>(null)
  console.log("product detail trong /products/id: ",productDetails);
  
  const getProductDetails = async () => {
    try { 
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET"
      })
      const data = await res.json()
      setProductDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[productId_GET]", err)
    }
  }

  useEffect(() => {
    getProductDetails()
  }, [])

  return loading ? <Loader /> : (
    <ProductForm initialData={productDetails} />
  )
}

export default ProductDetails