import { ProductProps } from '@/types';
import axios from 'axios';

const url = 'https://fakestoreapi.com/products';

export async function fetchProductsByCategory(
  categoryName: string
): Promise<ProductProps[]> {
  try {
    const response = await axios.get(`${url}/category/${categoryName}?limit=6`);

    return response.data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

export async function fetchProductsById(id: string): Promise<ProductProps> {
  try {
    const response = await axios.get(`${url}/${id}`);

    return response.data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

export async function getAllProducts(): Promise<ProductProps[]> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}
