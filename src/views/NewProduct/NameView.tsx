import React, { ChangeEvent } from 'react';

import { IProduct } from '../../interfaces/product';

import InputField from '../../components/InputField';

import styles from './NewProduct.module.css';

interface INameViewProps {
    currentProduct: IProduct
    handleChange: (e: ChangeEvent<HTMLInputElement>, field: keyof IProduct, isInt?: boolean) => void
}

export default function NameView({ currentProduct, handleChange }: INameViewProps) {
  return (
    <section className={styles['name-view']}>
      <h3>Gib einen Produkt Namen ein</h3>
      <InputField
        type="text"
        name="name"
        placeholder="Name"
        value={currentProduct.name ?? ''}
        onChange={(e) => handleChange(e, 'name')}
        required
      />
    </section>
  );
}
