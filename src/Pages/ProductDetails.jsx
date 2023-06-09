import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error)
        }
    }

    // get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProduct(data?.products);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className="row container m-3" style={{height: "100%"}}>
                <div className="col-md-5">
                    <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        style={
                            {
                                width: '400px',
                                height: 'auto'
                            }
                        }
                    />
                </div>
                <div className="col-md-6">
                    <h1 className='text-center'>Details</h1>
                    <h6>Name: {product.name}</h6>
                    <h6>Category: {product?.category?.name}</h6>
                    <h6>Description: {product.description}</h6>
                    <h6>Price: ₹{product.price}</h6>
                    <button class="btn btn-outline-primary">Add to Cart</button>
                </div>
            </div>
            <hr />
            <div className="row m-3 container">
                <h3>Similar products</h3>
                {relatedProduct.length < 1 && (<h4 className='text-center'>No similar products found 🙃</h4>)}
                <div className="d-flex flex-wrap">
                    {
                        relatedProduct?.map((p) => (
                            <div className="card m-2" style={{ width: '18rem' }}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}</p>
                                    <p className="card-text">₹{p.price}</p>
                                    <button
                                        class="btn btn-primary ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                    <button class="btn btn-outline-secondary ms-1">Add to Cart</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails