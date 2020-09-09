import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { addProduct, updateProduct } from '../../store/actions/products';
import { addDBItem, updateDBItem } from '../../store/actions/asyncActions';
import { IFormValues } from '../../interfaces/form';
import { IProduct } from '../../interfaces/product';
import { updateFrom, resetForm } from '../../store/actions/forms';
import { RootState } from '../../interfaces/state';

import StepView, { Step } from '../../components/StepView';
import Button from '../../components/Button';

import NameView from './NameView';
import PartView from './PartView';
import SizeView from './SizeView';

const mapStateToProps = (state: RootState) => ({
  currentProduct: state.forms.currProduct,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateProductForm: (value: IFormValues) => dispatch(updateFrom('currProduct', value)),
  resetProductForm: () => dispatch(resetForm('currProduct')),
  addItem: (value: IProduct) => dispatch(addDBItem('products', value, addProduct)),
  updateItem: (id: number, value: IProduct) => dispatch(updateDBItem('products', id, value, updateProduct)),
});

export type reduxProps =
    ReturnType<typeof mapDispatchToProps>&ReturnType<typeof mapStateToProps>;

function ProductModal(
  {
    currentProduct, updateProductForm, resetProductForm, addItem, updateItem,
  }: reduxProps,
) {
  useEffect(() => () => resetProductForm(), [resetProductForm]);
  const [currPartIndex, setCurrPartIndex] = useState(currentProduct?.parts.length ?? 0);
  const history = useHistory();

  const { name, parts } = currentProduct;

  const close = () => history.goBack();

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

    close();
  };

  const handleReset = () => {
    resetProductForm();
  };

  return (
    <>
      <Button onClick={close} noShadow noBackground icon={faTimes}>Abbrechen</Button>
      <form onSubmit={handleSubmit}>
        <StepView>
          <Step name="Produkt Name" goForward={typeof name === 'string' && name !== ''}>
            <NameView currentProduct={currentProduct} handleChange={handleChange} />
          </Step>
          <Step name="Produkt Teile" goForward={Array.isArray(parts) && parts.length > 0}>
            <PartView
              currentProduct={currentProduct}
              currPartIndex={currPartIndex}
              setCurrPartIndex={setCurrPartIndex}
              updateProductForm={updateProductForm}
            />
          </Step>
          <Step name="Produkt Größen">
            <SizeView currentProduct={currentProduct} updateProductForm={updateProductForm} />
          </Step>
        </StepView>
        <Button type="button" noBackground noShadow onClick={handleReset}>Reset</Button>
      </form>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
