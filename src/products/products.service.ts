import { Injectable, NotFoundException } from '@nestjs/common';

import {InjectModel} from '@nestjs/mongoose'; //to inject model to services
import { Product } from './product.model';
import {Model} from 'mongoose';

@Injectable()
export class ProductsService {

  constructor(@InjectModel('Product') private readonly ProductModel : Model<Product> ){}
  
  async insertProduct(title: string, desc : string, price: number) {
    
    const newProduct = new this.ProductModel({
      title : title,   
      description : desc,
      price   // also can write as price only bcause the model and param name is same
    });
    const result =  await newProduct.save(); //will auto save to DB. the query already work behinde the mongoose plugin.

    
    return result._id as string;
  }

  async getProducts() {
    const products = await this.ProductModel.find();
    return products.map((product)=> ({
      id: product.id,
      title: product.title,
      desc: product.description,
      price: product.price
    }));
  }

  async getSingleProduct(productId: string) {
    try {
      const result = await this.ProductModel.findById(productId);
      return { result};
      
    } catch (error) {
      
      throw new NotFoundException('cannot find any product!');
      
    }
  }

  async updateProduct(productId: string, title: string, desc: string, price: number) {

    try {
      const newProduct = await this.ProductModel.findById(productId);
      
      if(title){
        newProduct.title = title;
      }
      if(desc){
        newProduct.description = desc
      }
      if(price){
        newProduct.price = price
      }
      newProduct.save();
      return 'succesful updated'
    } catch (error) {
     throw new NotFoundException('Failed to update the product')
   } 
  }

  async deleteProduct(prodId: string) {
    const result = await this.ProductModel.deleteOne({_id:prodId});
    console.log('result: ' , result);
    if(result.n === 0){     //when no value from result
      throw new NotFoundException('delete failed', 'failed')
    }
    return 'succesful deleted'
  
  }
  
}
