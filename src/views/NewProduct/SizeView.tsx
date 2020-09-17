import React, { useState, FormEvent } from 'react';

import { IProduct } from '../../interfaces/product';
import { reduxProps } from '.';

import Button from '../../components/Button';
import Card, { CardBody, CardWithTitle } from '../../components/Card';
import InputField from '../../components/InputField';

import styles from './NewProduct.module.css';

interface ISizeView{
  currentProduct: IProduct
  updateProductForm: reduxProps['updateProductForm']
}

export default function SizeView({ currentProduct, updateProductForm }: ISizeView) {
  // eslint-disable-next-line
  const [inputVisible, setInputVisible] = useState(false);

  const handleSizeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = e.currentTarget.elements;
    // @ts-ignore
    const size = +formData.size.value;
    const values = {};

    for (let i = 0; i < formData.length; i++) {
      // @ts-ignore
      const { name, value } = formData[i];
      const [part, measure] = name.split('-');

      // @ts-ignore
      if (currentProduct.parts.indexOf(part) !== -1) {
        // @ts-ignore
        values[part] = values[part] ?? {};
        // @ts-ignore
        values[part][measure] = +value;
      }
    }

    // @ts-ignore
    updateProductForm({ sizes: { [size]: values } });

    e.currentTarget.reset();
  };

  // TODO: Add size delete button.
  // TODO: Add size edit button.
  return (
    <section className={styles['size-view']}>
      {
        currentProduct?.sizes
        // @ts-ignore
        && Object.entries(currentProduct?.sizes).map(([key]) => <CardWithTitle title={key} />)
      }
      <div className={styles['new-size-container']}>
        {inputVisible ? (
          <div className={styles['new-size']}>
            <form onSubmit={handleSizeSubmit}>
              <Card>
                <CardBody>
                  <h3>Erstelle eine neue Größe</h3>
                  <div className={styles['new-size-form']}>
                    <InputField
                      type="text"
                      name="size"
                      placeholder="Größe"
                      label="Größe"
                      required
                    />
                    {currentProduct?.parts && (
                      currentProduct?.parts.map((ele) => (
                        <div className={styles.part}>
                          <InputField required type="text" name={`${ele}-width`} label={`${ele} Breite`} placeholder={`${ele} Width`} />
                          <InputField required type="text" name={`${ele}-height`} label={`${ele} Länge`} placeholder={`${ele} Height`} />
                        </div>
                      ))
                    )}
                    <Button type="submit">Hinzufügen</Button>
                  </div>
                </CardBody>
              </Card>
            </form>
          </div>
        )
          : <Button onClick={() => setInputVisible(true)}>Größe Hinzufügen</Button>}
        <Button type="submit">Produkt Speichern</Button>
      </div>
    </section>
  );
}
