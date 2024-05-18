'use client';

import Product from '@/components/Product';
import { filterByPrice, filterByRating } from '@/constant';
import { ProductProps } from '@/types';
import { getAllProducts } from '@/utils/fetchData';
import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [fileredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [priceRange, setPriceRange] = useState('');
  const [rating, setRating] = useState('');
  console.log(fileredProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getAllProducts();
        setProducts(productData);
        setFilteredProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [setFilteredProducts]);

  const handlePriceFilter = (min: number, max: number) => {
    const filtered = products.filter(
      (product) => product.price >= min && product.price <= max
    );

    setFilteredProducts(filtered);
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange = e.target.value;
    setPriceRange(selectedRange);

    switch (selectedRange) {
      case '1-50':
        handlePriceFilter(1, 50);
        break;
      case '51-100':
        handlePriceFilter(51, 100);
        break;
      case '101-500':
        handlePriceFilter(101, 500);
        break;
      case '501-1000':
        handlePriceFilter(501, 1000);
        break;
      default:
        setFilteredProducts(products);
        break;
    }
  };

  const handleRatingFilter = (value: string) => {
    const filtered = products.filter(
      (product) => product.rating.rate.toFixed() === value
    );
    setFilteredProducts(filtered);
  };
  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRating = e.target.value;
    setRating(selectedRating);
    handleRatingFilter(selectedRating);
  };

  const sortByCustomerReviews = () => {
    const sorted = [...fileredProducts].sort(
      (a, b) => b.rating.count - a.rating.count
    );
    setFilteredProducts(sorted);
  };

  const sortByPriceLowToHigh = () => {
    const soted = [...fileredProducts].sort((a, b) => a.price - b.price);
    setFilteredProducts(soted);
  };

  const sortByPriceHighToLow = () => {
    const soted = [...fileredProducts].sort((a, b) => b.price - a.price);
    setFilteredProducts(soted);
  };

  if (fileredProducts.length === 0) {
    return (
      <div className='max-w-7xl mx-auto bg-white flex justify-center items-center min-h-[80vh]'>
        <h2 className=' text-red-500 text-2xl'>No Prodcuts Found</h2>
      </div>
    );
  }
  return (
    <section className=' max-w-7xl mx-auto bg-white border-t-2 min-h-[80vh]'>
      <div className=' flex justify-evenly py-3'>
        <div className=' flex justify-center items-start flex-col'>
          <h2 className=' text-lg text-blue-400 font-semibold'>Filter By</h2>
          <div>
            <select
              value={priceRange}
              onChange={handleFilterChange}
              className=' text-gray-700 cursor-pointer px-2 py-1 focus:ring-2 '
            >
              {filterByPrice.map((item) => (
                <option
                  key={item.id}
                  value={item.value}
                  className=' cursor-pointer px-2'
                >
                  {item.value}
                </option>
              ))}
            </select>

            <select
              value={rating}
              onChange={handleRatingChange}
              className=' px-6 text-gray-700 cursor-pointer py-1 focus:ring-2'
            >
              {filterByRating.map((item) => (
                <option
                  value={item.value}
                  key={item.id}
                  className=' cursor-pointer px-2'
                >
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <h2 className='text-lg text-blue-400 font-semibold'>Sort By</h2>
          <div className=' flex flex-col sm:flex-row gap-2 text-gray-700 cursor-pointer px-2 py-1'>
            <button
              onClick={sortByCustomerReviews}
              className='cursor-pointer hover:bg-gray-500 hover:text-white transition-all whitespace-nowrap border-2 px-2 py-1'
            >
              Customer Reviews
            </button>
            <button
              onClick={sortByPriceLowToHigh}
              className='cursor-pointer hover:bg-gray-500 hover:text-white transition-all  whitespace-nowrap border-2 px-2 py-1'
            >
              Price Low to High
            </button>
            <button
              onClick={sortByPriceHighToLow}
              className='cursor-pointer hover:bg-gray-500 hover:text-white transition-all  whitespace-nowrap border-2 px-2 py-1'
            >
              Price High to Low
            </button>
          </div>
        </div>
      </div>

      <Product products={fileredProducts} />
    </section>
  );
};

export default Products;
