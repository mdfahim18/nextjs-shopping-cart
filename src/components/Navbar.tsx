'use client';

import { RootState } from '@/app/store';
import { allCategories } from '@/constant';
import { openSidebar } from '@/utils/appSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaBars, FaCartArrowDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const amount = useSelector((state: RootState) => state.app.amount);

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <header className='bg-white max-w-7xl mx-auto flex-1 flex justify-between items-center padding-x'>
      <nav className='flex items-center gap-5'>
        <FaBars
          onClick={() => dispatch(openSidebar())}
          className=' bg-blue-900 sm:hidden flex text-3xl py-1 px-0 rounded-none cursor-pointer text-white'
        />
        <Image
          src='/logo.png'
          alt='logo'
          width={100}
          height={100}
          className='object-contain cursor-pointer'
          onClick={() => router.push('/')}
        />
        <ul className=' list-none capitalize justify-between items-center gap-3 hidden text-gray-700 whitespace-nowrap cursor-pointer sm:flex'>
          <li className=' font-semibold border-2 hover:bg-gray-400 transition-all hover:text-white px-2 py-1'>
            <Link href='/products'>All Categories</Link>
          </li>
          {allCategories.map((item) => (
            <li key={item.id}>
              <Link href={`/${item.link}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className=' relative'>
        <span className=' bg-red-500 text-white rounded-full px-2 absolute -top-3 -left-7 font-bold text-xl z-10'>
          {amount}
        </span>
        <Link href='/cart'>
          <FaCartArrowDown className=' text-2xl cursor-pointer' />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
