import { MouseEventHandler } from 'react';

export interface SeacrchbarProps {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

export interface ButtonProps {
  title: string;
  className?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: 'button' | 'submit' | 'reset';
}

export interface PageStateProps {
  title: string;
  subTitle: {
    label: string;
    url: string;
  }[];
}
export interface AllCategoryProps {
  id: number;
  title: string;
  link: string;
}

export interface ImageComponentProps {
  imageUrl: string;
  altText: string;
  className?: string;
  imageClass?: string;
}
export interface ProductProps {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
  quantity: number;
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}
