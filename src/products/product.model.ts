import  * as mongoose from 'mongoose'

export const ProductSchema = new  mongoose.Schema({
  title: {type : String , required: true},
  description: {type : String} ,
  price: {type : Number }

});
export interface Product {
    id: string,
    title: string,
    desc: string,
    price: number,
}
