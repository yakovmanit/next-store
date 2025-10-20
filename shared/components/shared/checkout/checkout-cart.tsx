 import React from 'react';
 import {CheckoutItem, CheckoutItemSkeleton, WhiteBlock} from "@/shared/components/shared";
 import {getCartItemDetails} from "@/shared/lib";
 import {CoffeeSize, CoffeeType} from "@/shared/constants/coffee";
 import {CartStateItem} from "@/shared/lib/get-cart-details";

 interface Props {
   items: CartStateItem[];
   onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
   removeCartItem: (id: number) => void;
   loading?: boolean;
   className?: string;
 }

 export const CheckoutCart: React.FC<Props> = (
   {
     items,
     onClickCountButton,
     removeCartItem,
     loading,
     className,
   }
 ) => {
   return (
     <WhiteBlock title="1. Cart" className={className}>
       <div className="flex flex-col gap-4">
         {loading
           ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
           : items.map((item) => (
             <CheckoutItem
               key={item.id}
               id={item.id}
               name={item.name}
               price={item.price}
               quantity={item.quantity}
               imageUrl={item.imageUrl}
               details={
               getCartItemDetails(
                 item.ingredients,
                 item.coffeeType as CoffeeType,
                 item.coffeeSize as CoffeeSize,
               )
             }
               disabled={item.disabled}
               onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
               onClickRemove={() => removeCartItem(item.id)}
             />
           ))}
       </div>
     </WhiteBlock>
   );
 };
