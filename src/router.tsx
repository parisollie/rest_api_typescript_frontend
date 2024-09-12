import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { loader as productsLoader, action as updateAvailabilityAction } from './views/Products'
import NewProduct, { action as newProductAction } from './views/NewProduct'
import EditProduct, { loader as editProductLoader, action as editProductAction } from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'

//Vid 402
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, 
        //Vid 402, children porque pueden ser multiples. 
        children: [
            {
                index: true,
                element: <Products />,
                //Vid 415
                loader: productsLoader,
                //Vid 430 
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                //Vid 405
                action: newProductAction
            },
            {
                //Vid 417
                path:'productos/:id/editar', // ROA Pattern - Resource-oriented design
                element: <EditProduct />,
                //Vid 421
                loader: editProductLoader,
                //Vid 423
                action: editProductAction
            }, 
            //Vid 428
            {
                path:'productos/:id/eliminar',
                action: deleteProductAction
            }
        ],
    }
])