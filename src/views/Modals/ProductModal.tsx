import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { connect } from 'react-redux';

import StepView, { IStep } from 'src/components/StepView';
import { addProduct, updateProduct } from '../../store/actions/products';
import { addDBItem, updateDBItem } from '../../store/actions/asyncActions';
import { IFormValues } from '../../interfaces/form';
import { IProduct } from '../../interfaces/product';
import { updateFrom, resetForm } from '../../store/actions/forms';
import { RootState } from '../../interfaces/state';

const mapStateToProps = (state: RootState) => ({
  currentProduct: state.forms.currProduct,
  currentModal: state.ui.currentModalComponent,
});
const mapDispatchToProps = (dispatch: any) => ({
  updateProductForm: (value: IFormValues) => dispatch(updateFrom('currProduct', value)),
  resetProductForm: () => dispatch(resetForm('currProduct')),
  addItem: (value: IProduct) => dispatch(addDBItem('products', value, addProduct)),
  updateItem: (id: number, value: IProduct) => dispatch(updateDBItem('products', id, value, updateProduct)),
  // resetDeleteConfirm: () => dispatch(resetForm('deleteCurrent')),
});

type reduxProps =
  ReturnType<typeof mapDispatchToProps>&ReturnType<typeof mapStateToProps>;

interface IProductModal {
  openOrCloseModal: (modalComponent?: string) => void
}

function ProductModal(
  {
    openOrCloseModal, currentProduct, updateProductForm, resetProductForm, addItem, updateItem, currentModal,
  }: IProductModal & reduxProps,
) {
  useEffect(() => () => resetProductForm(), [currentModal, resetProductForm]);
  const [currPartIndex, setCurrPartIndex] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof IProduct, isInt = false) => {
    // @ts-ignore
    updateProductForm({ [field]: isInt ? +e.target.value : e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentProduct.id) {
      addItem(currentProduct);
    } else {
      updateItem(currentProduct.id, currentProduct);
    }

    openOrCloseModal();
  };
  const handleAddButton = () => {
    setCurrPartIndex(currPartIndex + 1);
  };
  const handlePartsChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const parts = [...currentProduct.parts];
    if (!parts[currPartIndex]) parts[currPartIndex] = '';
    parts[currPartIndex] = e.target.value;
    // @ts-ignore
    updateProductForm({ parts });
  };
  const handleReset = () => {
    resetProductForm();
  };

  const steps: IStep[] = [
    {
      name: 'Name',
      element: (<input
        type="text"
        name="name"
        placeholder="Name"
        required
      />),
    },
    {
      name: 'Teile',
      element: (
        <>
          {currentProduct.parts && currentProduct.parts.map((ele, i) => ((i < currPartIndex) ? (<div>{ele}</div>) : null))}
          <input
            type="text"
            name="part"
            placeholder="Teil"
            required
            value={currentProduct.parts[currPartIndex] ?? ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlePartsChange(e)}
          />
          <button type="button" onClick={handleAddButton}>Teil hinzufügen</button>
        </>),
    },
    {
      name: 'Größen',
      element: (
        <>
          <input
            type="text"
            name="size"
            placeholder="Größe"
            required
          />
          <button type="submit">Submit</button>
        </>),
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <StepView steps={steps} />
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
