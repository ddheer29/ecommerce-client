import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const getProductsByCat = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (params?.slug) {
            getProductsByCat();
        }
    }, [params?.slug])
    return (
        <Layout>
            <div className="container mt-3">
                <h2 className='text-center'>Category - {category?.name}</h2>
                <h4 className='text-center'>{products?.length} results found</h4>
                <div className="row">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {
                            products?.map((p) => (
                                <div className="card m-2" style={{ width: '18rem' }}>
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
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
                    {/* <div className='m-2 p-3'>
                            {
                                products && products.length < total && (
                                    <button
                                        className='btn btn-warning'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage(page + 1);
                                        }}>
                                        {loading ? 'Loading...' : 'Loadmore...'}
                                    </button>
                                )
                            }
                        </div> */}
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct