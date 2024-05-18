'use client';

import Button from '@/components/Button';
import ImageComponent from '@/components/ImageComponent';
import { ProductProps } from '@/types';
import { increment, removeItem } from '@/utils/appSlice';
import { fetchProductsById } from '@/utils/fetchData';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function ProductDetails({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.app.cart);
  const router = useRouter();
  console.log(cart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductsById(params.productId);
        console.log('productData:', productData);
        setProduct(productData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.productId]);

  useEffect(() => {
    if (product) {
      const found = cart.find((item: ProductProps) => item.id === product.id);
      setIsInCart(!!found);
      console.log('hi', found);
    }
  }, [product, cart]);

  if (loading) {
    return (
      <div className=' max-w-7xl mx-auto min-h-[80vh] flex justify-center items-center'>
        <h1 className=' animate-bounce text-2xl text-white'>Loading...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='max-w-7xl mx-auto min-h-[80vh] flex justify-center items-center'>
        <h1 className=' text-2xl text-white'>No Product Found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeItem(product));
      toast.error('Remove from cart');
    } else {
      dispatch(increment(product));
      toast.success('Added to cart');
    }
  };

  return (
    <section className='p-6 bg-white max-w-7xl mx-auto h-[80vh] '>
      <div
        key={product.id}
        className='flex gap-4 justify-between sm:justify-between'
      >
        <div className='flex  flex-col gap-2'>
          <ImageComponent
            imageUrl={product.image}
            altText={product.title}
            className='w-40 sm:w-[20rem] h-36'
          />
          <h2 className='mt-4'>{product.title}</h2>
          <Button
            title={isInCart ? 'Remove from cart' : 'Add to cart'}
            className={`rounded-sm border border-gray-300 transition-all px-6 ${
              isInCart
                ? 'bg-red-500 hover:bg-red-600'
                : 'hover:bg-gray-200 hover:border-gray-800'
            }`}
            handleClick={handleAddToCart}
          />
          <Button
            title='Back'
            className=' bg-blue-500 rounded-sm border border-gray-300 transition-all px-6 hover:bg-gray-200 hover:border-gray-800'
            handleClick={() => router.back()}
          />
        </div>
        <div className='flex  flex-col'>
          <h4 className='text-yellow-400 font-bold text-lg'>
            ${product.price}
          </h4>
          <p className='text-gray-800 font-semibold'>
            <span>{product.rating.rate}</span>
            /5
          </p>
          <p>{product.description}</p>
        </div>
      </div>
    </section>
  );
}
