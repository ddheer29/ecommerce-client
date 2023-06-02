import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Policy from './Pages/Policy'
import PageNotFound from './Pages/PageNotFound'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import Dashboard from './Pages/user/Dashboard'
import PrivateRoute from './components/Routes/Private'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import AdminRoute from './components/Routes/AdminRoute'
import AdminDashboard from './Pages/admin/AdminDashboard'
import CreateCategory from './Pages/admin/CreateCategory'
import CreateProduct from './Pages/admin/CreateProduct'
import Users from './Pages/admin/Users'
import Orders from './Pages/user/Orders'
import Profile from './Pages/user/Profile'
import Products from './Pages/admin/Products'
import UpdateProduct from './Pages/admin/UpdateProduct'
import Search from './Pages/Search'

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/search' element={<Search />} />
                <Route path='/dashboard' element={<PrivateRoute />} >
                    <Route path='user/orders' element={<Orders />} />
                    <Route path='user' element={<Dashboard />} />
                    <Route path='user/orders' element={<Orders />} />
                    <Route path='user/profile' element={<Profile />} />
                </Route>
                <Route path='/dashboard' element={<AdminRoute />} >
                    <Route path='admin' element={<AdminDashboard />} />
                    <Route path='admin/create-category' element={<CreateCategory />} />
                    <Route path='admin/create-product' element={<CreateProduct />} />
                    <Route path='admin/product/:slug' element={<UpdateProduct />} />
                    <Route path='admin/products' element={<Products />} />
                    <Route path='admin/users' element={<Users />} />
                </Route>
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/policy' element={<Policy />} />
                <Route path='/*' element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default App