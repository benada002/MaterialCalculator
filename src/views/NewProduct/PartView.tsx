import React, { ChangeEvent, useState } from 'react';

import { IProduct } from '../../interfaces/product';
import { reduxProps } from '.';

import Button from '../../components/Button';
import { CardWithTitle } from '../../components/Card';
import InputField from '../../components/InputField';

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
    <>
      {
      currentProduct.parts
      && currentProduct.parts.map((ele, i) => ((i < currPartIndex) ? (<CardWithTitle title={ele} />)
        : null))
      }
      {inputVisible ? (
        <>
          <InputField
            type="text"
            name="part"
            placeholder="Teil"
            required
            value={currentProduct?.parts[currPartIndex] ?? ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlePartsChange(e)}
          />
          <Button onClick={handleAddButton}>Hinzufügen</Button>
        </>
      ) : <Button onClick={() => setInputVisible(true)}>Teil Hinzufügen</Button>}
    </>
  );
}
