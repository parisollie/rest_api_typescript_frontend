import { Link, Form, useActionData, ActionFunctionArgs, redirect } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { addProduct } from '../services/ProductService'
import ProductForm from '../components/ProductForm'

//Vid 405
//Vid 406, le ponemos request para recuperar productos
//Vid 407,ActionFunctionArgs
export async function action({request} : ActionFunctionArgs) {
    //Vid 406
    const data = Object.fromEntries(await request.formData())
    //Validaciones 
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }
    //Vid 408
    //Vid 413,le ponemos await 
    await addProduct(data)
    //Vid 407
    //Vid 413, redireccionamos a la pagina principal
    return redirect('/')
}
//Vid 406 
export default function NewProduct() {
    //Vid 407,el error desconocdio para que no nos marque como error 
    const error = useActionData() as string

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Registrar Producto</h2>
                <Link
                //Vid 404
                    to="/"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Volver a Productos
                </Link>
            </div>

            
            {error && <ErrorMessage>{error}</ErrorMessage>}

             
            <Form
                className="mt-10" 
                //Vid 405 
                method='POST'
            >
            
                <ProductForm />

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        
        </>
    )
}
