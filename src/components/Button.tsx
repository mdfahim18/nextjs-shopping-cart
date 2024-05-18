import { ButtonProps } from '@/types';
import { cn } from '@/utils/cn';

const Button = ({ title, handleClick, btnType, className }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      type={btnType}
      className={cn(`w-5rem bg-yellow-500 px-2 py-1 rounded-lg ${className}`)}
    >
      {title}
    </button>
  );
};

export default Button;
