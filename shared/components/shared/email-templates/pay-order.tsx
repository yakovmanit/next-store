import React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = (
  {orderId,
    totalAmount,
    paymentUrl,
  }) => {
  return (
    <div>
      <h1>Order #{orderId}</h1>

      <p>Please, pay {totalAmount} ₴. Use <a href={paymentUrl}>following link</a></p>
    </div>
  );
}