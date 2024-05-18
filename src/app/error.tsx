'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className=' max-w-7xl mx-auto bg-white h-[80vh] flex flex-col justify-center items-center'>
      <h2>Something went wrong!</h2>
      <button
        className=' border-2 px-2 py-1 font-semibold'
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
