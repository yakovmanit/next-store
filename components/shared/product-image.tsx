import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
}

export const ProductImage: React.FC<Props> = ({ imageUrl, className }) => {
  return (
    <div className={className}>
      <img
        className="w-full h-full object-cover"
        src={imageUrl}
        alt="Product image"
      />
    </div>
  );
};
