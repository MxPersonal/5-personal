"use client";

import { useCart } from "./cart-provider";
import { Icon } from "./icon";

export function AddToCartButton({ productId }: { productId: number }) {
  const { addItem } = useCart();
  return <button className="add-to-cart" type="button" onClick={() => addItem(productId)}>افزودن به سبد خرید <Icon name="bag" size={19}/></button>;
}
