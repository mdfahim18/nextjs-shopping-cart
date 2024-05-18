'use client';

import { RootState } from '@/app/store';
import { allCategories } from '@/constant';
import { closeSidebar } from '@/utils/appSlice';
import Image from 'next/image';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.app.isSidebarOpen
  );
  const dispatch = useDispatch();

  return (
    <div
      className={`${
        isSidebarOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper'
      }`}
    >
      <div className='flex justify-between items-center padding-x py-[3.5px] bg-gray-100'>
        <Image
          src='/logo.png'
          alt='shopping.com'
          width={100}
          height={100}
          className=' h-[6rem] object-cover cursor-pointer'
        />
        <FaTimes
          onClick={() => dispatch(closeSidebar())}
          className=' text-3xl cursor-pointer'
        />
      </div>
      <ul className='flex justify-start padding-y gap-5 padding-x text-gray-300 capitalize flex-col '>
        <li className=' font-semibold border-2 hover:bg-gray-400 transition-all hover:text-white  px-4 py-2 rounded-md'>
          <Link href='/products'>All Categories</Link>
        </li>
        {allCategories.map((item) => (
          <li
            key={item.id}
            className=' hover:bg-gray-400 hover:text-white transition-all rounded-md cursor-pointer px-4 py-2'
          >
            <Link href={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
