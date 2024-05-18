import { cn } from '@/utils/cn';

const Container = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        'w-full flex flex-col gap-3 bg-gray-200 text-gray-800 rounded-xl px-5 py-2 shadow-sm',
        props.className
      )}
    />
  );
};

export default Container;
