import React from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { IProduct } from '../../interfaces/product';
import { IProductState } from '../../interfaces/state';

import { CardWithTitle } from '../../components/Card';
import Button from '../../components/Button';

interface IChooseProduct {
    currProduct?: IProduct,
    products: IProductState,
    setCurrProduct: (product: IProduct) => void
}

export default function ChooseProduct({ currProduct, products, setCurrProduct }:IChooseProduct) {
  return (
    <>
      <h2>Wähle ein Produkt.</h2>
      {
          // @ts-ignore
          [...products.entries()].map(
            ([id, product]) => {
              const currentChoise = currProduct && currProduct.id === id;

              return (
                <CardWithTitle
                  key={id}
                  title={product.name}
                  rightChildren={[
                    <Button
                      onClick={() => setCurrProduct(product)}
                      noShadow
                      noBackground={currentChoise}
                      disabled={currentChoise}
                      icon={currentChoise ? faCheckCircle : undefined}
                    >
                      {currentChoise ? 'Ausgewählt' : 'Auswählen'}
                    </Button>,
                  ]}
                />
              );
            },
          )
        }
    </>
  );
}
