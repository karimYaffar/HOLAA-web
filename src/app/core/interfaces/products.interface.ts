import { Category } from "./categories.interface";

export interface Products{
    code: string;
    name: string;
    imgUri: string;
    description: string;
    price: number;
    stock: number;
    size: string[];
    colors: string[];
    categories: Category[]
    
}

export type ProductsWithoutCode = Omit<Products, 'code'>
