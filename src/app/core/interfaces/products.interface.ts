import { Categories } from "./categories.interface";

export interface Products{
    code: string;
    name: string;
    imgUri: string;
    description: string;
    price: number;
    stock: number;
    size: string[];
    colors: string[];
    categories: Categories[]
}

export type ProductsWithoutCode = Omit<Products, 'code'>
