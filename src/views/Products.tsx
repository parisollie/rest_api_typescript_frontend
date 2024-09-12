import { ActionFunctionArgs, Link, useLoaderData} from 'react-router-dom'
import { getProducts, updateProductAvailability } from '../services/ProductService'
import ProductDetails from '../components/ProductDetails';
import { Product } from '../types';


//Vid 415 
export async function loader() {
  const products = await getProducts()
  //Vid 416
  return products
}
//Vid 431 {request} : ActionFunctionArgs
export async function action({request} : ActionFunctionArgs) {
    //Vid 416 ,Vid 431 
    const data = Object.fromEntries(await request.formData())
    //Vid 432
    await updateProductAvailability(+data.id)
    return {}
}
//Vid 430 
export default function Products() {

  const data = useLoaderData() as Product[]

  //Vid 404
  return (
    <>
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Productos</h2>
            <Link
            //Vid 404
                to="productos/nuevo"
                className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
            >
                Agregar Producto
            </Link>
        </div>
  

        <div className="p-2">
            <table className="w-full mt-5 table-auto">
                <thead className="bg-slate-800 text-white">
                    <tr>
                        
                        <th className="p-2">Producto</th>
                        <th className="p-2">Precio</th>
                        <th className="p-2">Disponibilidad</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                  {data.map(product => (
                      <ProductDetails
                          key={product.id}
                          product={product}
                      />
                  ))}
                </tbody>
            </table>
        </div>
    </>
  )
}
