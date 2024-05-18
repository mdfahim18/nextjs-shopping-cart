'use client';

import { ImageComponentProps } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

const ImageComponent = ({
  imageUrl,
  altText,
  className,
  imageClass,
}: ImageComponentProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`w-40 h-36 ${className}`}>
      <div className='relative w-full h-full'>
        <Image
          src={imageUrl}
          alt={altText}
          layout='fill'
          objectFit='cover'
          onLoad={() => setLoaded(true)}
          className={`object-cover${imageClass}`}
        />
        {!loaded && (
          <div className='absolute top-0 left-0 w-full h-full bg-lightgray'></div>
        )}
      </div>
    </div>
  );
};

export default ImageComponent;
