import React, { useState, FormEvent } from 'react';

import { IProduct } from '../../interfaces/product';
import { reduxProps } from '.';

import Grid, { GridItem } from '../../components/Grid';
import Button from '../../components/Button';
import { CardWithTitle } from '../../components/Card';
import InputField from '../../components/InputField';

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
  return (
    <>
      {
        currentProduct?.sizes
        // @ts-ignore
        && Object.entries(currentProduct?.sizes).map(([key]) => <CardWithTitle title={key} />)
      }
      {inputVisible ? (
        <form onSubmit={handleSizeSubmit}>
          <Grid column>
            <GridItem>
              <InputField
                type="text"
                name="size"
                placeholder="Größe"
                required
              />
            </GridItem>
            {currentProduct?.parts && (
              <GridItem>
                {currentProduct?.parts.map((ele) => (
                  <Grid>
                    <GridItem>
                      <InputField required type="text" name={`${ele}-width`} placeholder={`${ele} Width`} />
                    </GridItem>
                    <GridItem>
                      <InputField required type="text" name={`${ele}-height`} placeholder={`${ele} Height`} />
                    </GridItem>
                  </Grid>
                ))}
              </GridItem>
                )}
            <GridItem>
              <Button type="submit">Hinzufügen</Button>
            </GridItem>
          </Grid>
        </form>
      )
        : <Button onClick={() => setInputVisible(true)}>Größe Hinzufügen</Button>}
      <Button type="submit">Submit</Button>
    </>
  );
}
