'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import { getAllProducts } from '@/utils/fetchData';
import { ProductProps } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import ImageComponent from './ImageComponent';

const Hero = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  console.log(products);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getAllProducts();
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  const handleInputChange = (value: string) => {
    setQuery(value);
    filterProducts(value);
  };

  const filterProducts = (query: string) => {
    const trimmedQuery = query.trim().toLowerCase();
    if (trimmedQuery === '') {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(trimmedQuery) ||
          product.category.toLowerCase().includes(trimmedQuery)
      );
      setFilteredProducts(filtered);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const matchingProduct = products.find(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    if (matchingProduct) {
      router.push(`/${matchingProduct.category}`);
    } else {
      toast.error('Product not found');
    }
  };
  return (
    <div className='relative w-full h-[270px]'>
      <div>
        <Image
          src='/hero.jpg'
          alt='hero section'
          className='w-full h-[270px] object-cover'
          width={1000}
          height={100}
        />
      </div>

      <div className=' flex justify-center items-center'>
        <Searchbar
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
      <div className=' absolute w-full max-h-[13rem] overflow-scroll scroll-bar z-50 bg-transparent top-[10rem]'>
        {filteredProducts.map((item) => (
          <Link
            key={item.id}
            className=' bg-white rounded-t-sm px-4 py-2 ml-auto mr-auto w-[30rem] sm:w-[36rem] flex justify-between gap-3 cursor-pointer border-b-2'
            href={`/products/${item.id}`}
          >
            <ImageComponent
              imageUrl={item.image}
              className=' w-[5rem] h-[4rem]'
              altText={item.title}
            />
            <h2 className=' font-bold text-lg'>{item.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hero;
