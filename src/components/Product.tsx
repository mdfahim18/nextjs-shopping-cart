'use client';
import Button from '@/components/Button';
import Container from '@/components/Container';
import ImageComponent from '@/components/ImageComponent';
import { ProductProps } from '@/types';
import { increment, removeItem } from '@/utils/appSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Product({ products }: { products: ProductProps[] }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state: any) => state.app.cart);
  console.log(products);

  const handleAddToCart = (product: ProductProps) => {
    dispatch(increment(product));
    toast.success('Added to cart');
  };
  const handleRemoveFromCart = (product: ProductProps) => {
    dispatch(removeItem(product));
    toast.error('Remove from cart');
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <LoadingAnimation />;
  }
  return (
    <div className=' grid grid-cols-2 sm:py-6 sm:grid-cols-4 gap-3'>
      {products?.map((product) => (
        <Container
          key={product.id}
          className='  rounded-none justify-between overflow-hidden'
        >
          <Link href={`products/${product.id}`}>
            <ImageComponent
              imageUrl={product.image}
              altText={product.title}
              className=' w-full'
            />
            <h1>{product.title}</h1>
            <div className=' flex justify-between font-semibold flex-col sm:flex-row'>
              <p>{product.rating.rate}/5</p>
              <p>Price: {product.price}</p>
            </div>
          </Link>
          {cart.some((item: ProductProps) => item.id === product.id) ? (
            <Button
              title='Remove'
              className='rounded-sm border border-gray-300 transition-all sm:px-4 bg-red-500 hover:bg-red-600'
              handleClick={() => handleRemoveFromCart(product)}
            />
          ) : (
            <Button
              title='Add to cart'
              className='rounded-sm border border-gray-300 transition-all sm:px-6 hover:bg-gray-200 hover:border-gray-800'
              handleClick={() => handleAddToCart(product)}
            />
          )}
        </Container>
      ))}
    </div>
  );
}

const LoadingAnimation = () => (
  <section className='max-w-7xl mx-auto bg-white border-t-2 min-h-[80vh]'>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 py-6'>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className='bg-white border border-gray-300 rounded-lg p-4 animate-pulse w-full'
        >
          <div className='h-24 bg-gray-200 rounded mb-2'></div>
          <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
          <div className='h-4 bg-gray-200 rounded w-1/2 mb-2'></div>
        </div>
      ))}
    </div>
  </section>
);
