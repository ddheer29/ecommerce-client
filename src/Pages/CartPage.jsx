import React from 'react'
import Layout from '../components/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => { total = total + item.price })
            return total;
        } catch (error) {
            console.log(error);
        }
    }

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid)
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout title={"Cart"}>
            <div className="container">
                <div className="row" style={{ marginLeft: "70px" }}>
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {
                                `Hello ${auth?.token && auth?.user?.name}`
                            }
                        </h1>
                        <h4 className="text-center">
                            {
                                cart?.length
                                    ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please Login to checkout"}`
                                    : "Your Cart is empty"
                            }
                        </h4>
                    </div>
                </div>
                <div className="row" style={{ marginLeft: "30px" }}>
                    <div className="col-md-8">
                        {
                            cart?.map((p) => (
                                <div className="row mb-2 p-2 card flex-row">
                                    <div className="col-md-4">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            width="100px"
                                            height={"200px"}
                                        />
                                    </div>
                                    <div className="col-md-8 mt-4">
                                        <h6 className='d-block'>{p.name}</h6>
                                        <h6>Price: ₹{p.price}</h6>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => removeCartItem(p._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total: ₹{totalPrice()}</h4>
                        {
                            auth?.user?.address ? (
                                <>
                                    <div className="mb-3">
                                        <h6>Delivery At: {auth?.user?.address}</h6>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate('/dashboard/user/profile')}
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3">
                                    {
                                        auth?.token ? (
                                            <button
                                                className="btn btn-outline-warning"
                                                onClick={() => navigate('/dashboard/user/profile')}
                                            >
                                                Update Address
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => navigate('/login', {
                                                    state: '/cart', // after login it will redirect to cart
                                                })}
                                            >
                                                Login to Checkout
                                            </button>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage