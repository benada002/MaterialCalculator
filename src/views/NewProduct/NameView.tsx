import React, { ChangeEvent } from 'react';

import { IProduct } from '../../interfaces/product';

interface INameViewProps {
    currentProduct: IProduct
    handleChange: (e: ChangeEvent<HTMLInputElement>, field: keyof IProduct, isInt?: boolean) => void
}

export default function NameView({ currentProduct, handleChange }: INameViewProps) {
  return (
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={currentProduct.name ?? ''}
      onChange={(e) => handleChange(e, 'name')}
      required
    />
  );
}
