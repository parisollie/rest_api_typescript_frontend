import { object, string, number, boolean, InferOutput, array } from 'valibot'

//Vid 409,
export const DraftProductSchema = object({
    name: string(),
    price: number()
})

//Vid 415
export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})
//Vid 415
export const ProductsSchema = array(ProductSchema)
export type Product = InferOutput<typeof ProductSchema>
