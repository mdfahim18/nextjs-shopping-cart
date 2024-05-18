import Container from '@/components/Container';
import Hero from '@/components/Hero';
import ImageComponent from '@/components/ImageComponent';
import { fetchProductsByCategory } from '@/utils/fetchData';
import Link from 'next/link';

export default async function Home() {
  const electronics = await fetchProductsByCategory('electronics');
  const jewelery = await fetchProductsByCategory('jewelery');
  const mensClothing = await fetchProductsByCategory(`men's clothing`);
  const womenClothing = await fetchProductsByCategory(`women's clothing`);

  return (
    <main className=' bg-white max-w-7xl mx-auto padding-x padding-y'>
      <Hero />
      <section className='flex flex-col justify-center items-center gap-7'>
        <Container className='mt-10 gap-1'>
          <h1 className='text-lg text-gray-950 tracking-wide'>Electronics</h1>

          <div className='flex gap-3 justify-between overflow-x-auto'>
            {electronics && electronics.length > 0
              ? electronics.map((item) => (
                  <Link key={item.id} href={`/products/${item.id}`}>
                    <div
                      key={item.id}
                      className='flex flex-col gap-2 w-40 justify-between cursor-pointer'
                    >
                      <ImageComponent
                        imageUrl={item.image}
                        altText={item.title}
                      />
                      <p title={item.title} className='text-sm '>
                        {item.title.substring(0, 30)}
                      </p>
                    </div>
                  </Link>
                ))
              : null}
          </div>
        </Container>

        <Container className='mt-10 gap-1'>
          <h1 className='text-lg text-gray-950 tracking-wide'>Electronics</h1>
          <div className='flex gap-3 justify-between overflow-x-auto'>
            {jewelery && jewelery.length > 0
              ? jewelery.map((item) => (
                  <div
                    key={item.id}
                    className='flex flex-col gap-2 w-40 justify-between cursor-pointer'
                  >
                    <ImageComponent
                      imageUrl={item.image}
                      altText={item.title}
                      className=' rounded-full'
                    />
                    <p title={item.title} className='text-sm '>
                      {item.title.substring(0, 30)}
                    </p>
                  </div>
                ))
              : null}
          </div>
        </Container>

        <Container className='mt-10 gap-1'>
          <h1 className='text-lg text-gray-950 tracking-wide'>Electronics</h1>
          <div className='flex gap-3 justify-between overflow-x-auto'>
            {mensClothing && mensClothing.length > 0
              ? mensClothing.map((item) => (
                  <div
                    key={item.id}
                    className='flex flex-col gap-2 w-40 justify-between cursor-pointer'
                  >
                    <ImageComponent
                      imageUrl={item.image}
                      altText={item.title}
                      className=' rounded-full'
                    />
                    <p title={item.title} className='text-sm '>
                      {item.title.substring(0, 30)}
                    </p>
                  </div>
                ))
              : null}
          </div>
        </Container>

        <Container className='mt-10 gap-1'>
          <h1 className='text-lg text-gray-950 tracking-wide'>Electronics</h1>
          <div className='flex gap-3 justify-between overflow-x-auto'>
            {womenClothing && womenClothing.length > 0
              ? womenClothing.map((item) => (
                  <div
                    key={item.id}
                    className='flex flex-col gap-2 w-40 justify-between cursor-pointer'
                  >
                    <ImageComponent
                      imageUrl={item.image}
                      altText={item.title}
                      className=' rounded-full'
                    />
                    <p title={item.title} className='text-sm '>
                      {item.title.substring(0, 30)}
                    </p>
                  </div>
                ))
              : null}
          </div>
        </Container>
      </section>
    </main>
  );
}
