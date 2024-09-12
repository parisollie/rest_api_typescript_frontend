import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom'
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from '../services/ProductService'

//Vid 416 
type ProductDetailsProps = {
    product: Product
}
//Vid 428 
export async function action({params} : ActionFunctionArgs) {
    //Vid 429 
    if(params.id !== undefined) {
        //Vid 429
        await deleteProduct(+params.id)
        //Vid 428 
        return redirect('/')
    }
}

export default function ProductDetails({product} : ProductDetailsProps) {
    //Vod 431 
    const fetcher = useFetcher()
    //Vid 419
    const navigate = useNavigate()
    //Vid 416
    const isAvailable = product.availability

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                { formatCurrency(product.price) }
            </td>
            <td className="p-3 text-lg text-gray-800">
                
                <fetcher.Form method='POST'>
                    <button
                        type='submit'
                        //Vid 431 
                        name='id'
                        value={product.id}
                        //Vid 430
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                        
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>
                
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                    //Vid 419 
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                    >Editar</button>

                    <Form
                        className='w-full'
                        method='POST'
                        //Vid 428
                        action={`productos/${product.id}/eliminar`}
                        //Vid 429 
                        onSubmit={ (e) => {
                            if( !confirm('¿Eliminar?') ) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                        //Vid 428 
                            type='submit'
                            value='Eliminar'
                            className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}
