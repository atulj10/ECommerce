import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [realtedProducts, setRelatedProducts] = useState([])
    const navigate = useNavigate()

    //Initial Details
    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params.slug])

    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getRelatedProducts(data?.product._id, data?.product.category?._id)
        } catch (error) {
            console.log(error)
        }
    }

    //related Products
    const getRelatedProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className='row container mt-2 product-details'>
                <div className='col-md-6'>
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} height={'400'} width={'350'} />
                </div>
                <div className='col-md-6 product-details-info'>
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name: {product.name}</h6>
                    <p><b>Description:</b> {product.description}</p>
                    <p><b>Category:</b> {product.category?.name}</p>
                    <p><b>Price:</b> {product.price}</p>
                    <button class="btn btn-secondary ms-1">Add to Cart</button>
                </div>
            </div>
            <hr />
            <div className='row container similar-products'>
                <h6>Similar Products</h6>
                {realtedProducts < 1 && <p className='text-center'>No Similar products found</p>}
                {realtedProducts?.map((p) => (
                    <div className="card m-2" style={{ width: '18rem' }} >
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0, 30)}...</p>
                            <p className="card-text">${p.price}</p>
                            <button class="btn btn-primary ms-1 mb-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                            <button class="btn btn-secondary ms-1">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default ProductDetails
