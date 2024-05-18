'use client';

import { SeacrchbarProps } from '@/types';
import Button from './Button';

const Searchbar = (props: SeacrchbarProps) => {
  return (
    <form onSubmit={props.onSubmit} className=' flex absolute top-[45%]'>
      <input
        value={props.value}
        onChange={props.onChange}
        type='text'
        required
        className='w-[300px] rounded-l-lg  outline-none sm:w-[500px] px-3 py-1'
      />
      <Button title='Search' className=' rounded-l-none' />
    </form>
  );
};

export default Searchbar;
