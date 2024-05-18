'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import ImageComponent from '@/components/ImageComponent';
import { clearCart, decrement, increment } from '@/utils/appSlice';
import Button from '@/components/Button';
import Container from '@/components/Container';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const { cart, totalPrice } = useSelector((state: RootState) => ({
    cart: state.app.cart,
    totalPrice: state.app.totalPrice,
  }));
  const dispatch = useDispatch();
  const router = useRouter();

  const handleIncrementQuantity = (id: number) => {
    const product = cart.find((item) => item.id === id);
    if (product) {
      dispatch(increment(product));
    }
  };
  const handleDecrementQuantity = (id: number) => {
    const product = cart.find((item) => item.id === id);
    if (product) {
      dispatch(decrement(product));
    }
  };

  if (cart.length === 0) {
    return (
      <div className=' max-w-7xl mx-auto bg-white w-full flex justify-center items-center flex-col gap-6 min-h-[80vh]'>
        <h1 className=' text-2xl'>Your cart is Empty</h1>
        <Button
          title='Back To Shopping'
          className=' bg-blue-500 rounded-sm  border-gray-300 hover:bg-gray-500 transition-all px-8 hover:text-white hover:border-gray-800'
          handleClick={() => {
            router.push('/products');
          }}
        />
      </div>
    );
  }
  return (
    <Container className=' max-w-7xl mx-auto padding-y rounded-none gap-6'>
      {cart.map((item) => (
        <div
          key={item.id}
          className=' flex justify-around items-center border-b-2 border-gray-600 py-2'
        >
          <div>
            <ImageComponent
              imageUrl={item.image}
              altText={item.title}
              className=' h-24'
            />
          </div>
          <div>
            <h3>Product Name</h3>
            <h3>{item.title.substring(0, 20)}</h3>
          </div>
          <div>
            <h3>Quentity</h3>
            <p className=' flex justify-center gap-2 items-center'>
              <Button
                title='-'
                handleClick={() => handleDecrementQuantity(item.id)}
                className=' cursor-pointer bg-gray-400 rounded-md px-6 text-white text-lg'
              />

              <span className=' text-xl'>{item.quantity}</span>
              <Button
                title='+'
                handleClick={() => handleIncrementQuantity(item.id)}
                className=' cursor-pointer bg-gray-400 rounded-md px-6 text-white text-lg'
              />
            </p>
          </div>

          <div>
            <h3>Price</h3>
            <p>{item.price * item.quantity}</p>
          </div>
        </div>
      ))}
      <hr />
      <div className=' flex justify-between'>
        <Button
          title='Clear cart'
          className=' rounded-none font-semibold tracking-normal px-6 py-2 hover:bg-yellow-600 hover:text-white transition-all'
          handleClick={() => {
            dispatch(clearCart()),
              alert('Are you that you want to clear cart?');
          }}
        />
        <h2 className=' text-left'>Total Price: {totalPrice.toFixed(2)}</h2>
      </div>
    </Container>
  );
}
