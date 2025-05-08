import { ReactNode } from "react";

 export interface Products {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export type GadgetProps = {
  gadget: Products;
  isAdmin: boolean;
};

export interface ButtonProps {
  [x: string]: unknown;
  children: ReactNode;
}

export interface Cart {
  items: Items[] 
}

export interface CartItemProps extends Items {
  onIncrease: () => void;
  onDecrease: () => void;
}

export interface CartTotal {
  total: number;
  item: Items;
}

export type Items = {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
};

export type ErrorProps = {
  title: string;
  message: string;
};

export interface InputProps {
  [x: string]: unknown;
  id: string;
  label: string;
  textarea: boolean;
}

export interface Orders {
  id: string;
  createdAt: Date;
  User: User;
  Products: orderedProducts[];
  total: number;
}

export interface User{
  name: string;
  email: string;
   city: string;
    street: string;
}

export interface orderedProducts {
  id: string;
  name: string;
  price: number;
  OrderItem: OrderItem
}

export interface OrderItem {
  quantity: string;
  price: number;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpHookConfig<T> {
  url: string;
  method: HttpMethod;
  initialData?: T;
}