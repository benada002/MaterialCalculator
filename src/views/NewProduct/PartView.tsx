import React, { ChangeEvent, useState } from 'react';

import { IProduct } from '../../interfaces/product';
import { reduxProps } from '.';

import Button from '../../components/Button';
import Card, { CardBody, CardWithTitle } from '../../components/Card';
import InputField from '../../components/InputField';

import styles from './NewProduct.module.css';

interface IPartView{
  currentProduct: IProduct
  currPartIndex: number
  setCurrPartIndex: (index: number) => void
  updateProductForm: reduxProps['updateProductForm']
}

export default function PartView({
  currentProduct, currPartIndex, setCurrPartIndex, updateProductForm,
}: IPartView) {
  // eslint-disable-next-line
  const [inputVisible, setInputVisible] = useState(false);

  const handlePartsChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const parts = [...currentProduct.parts];
    if (!parts[currPartIndex]) parts[currPartIndex] = '';
    parts[currPartIndex] = e.target.value;
    // @ts-ignore
    updateProductForm({ parts });
  };

  const handleAddButton = () => {
    setCurrPartIndex(currPartIndex + 1);
    setInputVisible(false);
  };

  // TODO: Add part delete button.
  return (
    <section className={styles['part-view']}>
      {
      currentProduct.parts
      && currentProduct.parts.map((ele, i) => ((i < currPartIndex) ? (<CardWithTitle title={ele} />)
        : null))
      }
      <div className={styles['new-part-container']}>
        {inputVisible ? (
          <div className={styles['new-part']}>
            <Card>
              <CardBody>
                <h3>Füge Ein neues Produkt hinzu</h3>
                <div className={styles['new-part-form']}>
                  <InputField
                    type="text"
                    name="part"
                    placeholder="Teil"
                    required
                    value={currentProduct?.parts[currPartIndex] ?? ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handlePartsChange(e)}
                  />
                  <Button onClick={handleAddButton}>Hinzufügen</Button>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : <Button onClick={() => setInputVisible(true)}>Teil Hinzufügen</Button>}
      </div>
    </section>
  );
}
