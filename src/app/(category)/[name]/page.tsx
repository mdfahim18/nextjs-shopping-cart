'use client';

import Product from '@/components/Product';
import { ProductProps } from '@/types';
import { fetchProductsByCategory } from '@/utils/fetchData';
import { useEffect, useState } from 'react';

export default function Category({
  params,
}: {
  params: {
    name: string;
  };
}) {
  console.log(params.name.replace(/-/g, ' '));

  const [products, setProducts] = useState<ProductProps[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await fetchProductsByCategory(
          params.name.replace(/-/g, ' ')
        );
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [params.name]);
  return (
    <section className=' bg-white max-w-7xl mx-auto min-h-[80vh]'>
      <Product products={products} />
    </section>
  );
}
